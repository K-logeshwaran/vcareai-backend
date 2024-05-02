const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const validator = require("email-validator");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const UserFiles = require("../schema/userFiles");

const User = require("../schema/userRegistrationSchema"); // Make sure to provide the correct path to your userRegistrationSchema file
const multer = require("multer");
const { USER_STATUS } = require("../config");
const { route } = require("./mailHandlers");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ca225113134@bhc.edu.in",
    pass: "goodmorning003@",
  },
});

function jwtValidateUser(req, res, next) {
  let token = req.header("Authorization");

  console.log("tkn", token);
  req.token = token;
  next();
}

// Multer configuration for handling file uploads
const storage = multer.memoryStorage(); // Store files in memory as buffers
const upload = multer({ storage: storage });

// Route for user registration
router.post("/register", async (req, res) => {
  try {
    // Extract user details from the request body
    const { fullName, email, password, recoveryEmail } = req.body;

    if (!email || !fullName || !password || !recoveryEmail)
      return res.status(400).json({ error: "all fields required" });

    if (!validator.validate(email) || !validator.validate(recoveryEmail))
      // true
      return res.status(400).json({ error: "enter a valid email id" });
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    // Create a new user instance
    let pass = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      email,
      password: pass,
      recoveryEmail,
      status: USER_STATUS.NEW_REGISTER,
      assigned: false,
      assignedTo: null,
    });

    // Save the user to the database
    await newUser.save();
    const userFiles = new UserFiles({ userEmail: email });
    await userFiles.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route for updating and storing PDF files

router.post(
  "/updatePdf",
  [
    jwtValidateUser,
    upload.fields([
      { name: "pancard", maxCount: 1 },
      { name: "aadharcard", maxCount: 1 },
    ]),
  ],
  async (req, res) => {
    jwt.verify(req.token, process.env.USER_SECRET_KEY, async (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send("add a valid token to the request");
      }
      try {
        const { email } = data;
        let updateFields = {};

        // Check if the user exists
        const user = await User.findOne({
          email,
        });
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        console.log(user.pancardPDF);
        console.log("lkf", req.files);
        console.log("lkf", user);
        // Update Pan card details
        let pancardPDF = {};
        if (req.files && req.files["pancard"]) {
          const panF = req.files["pancard"][0];
          console.log("panF", panF.buffer);
          pancardPDF.data = panF.buffer;
          pancardPDF.contentType = panF.mimetype;
        } else {
          pancardPDF = user.pancardPDF;
        }

        // Update Aadhar card details
        let aadharCardPDF = {};
        if (req.files && req.files["aadharcard"]) {
          const aadharF = req.files["aadharcard"][0];
          aadharCardPDF.data = aadharF.buffer;
          aadharCardPDF.contentType = aadharF.mimetype;
        } else {
          aadharCardPDF = user.aadharCardPDF;
        }

        // Update other fields if needed
        updateFields.panNumber = req.body.panNumber || user.panNumber;
        updateFields.aadharNumber = req.body.aadharNumber || user.aadharNumber;
        updateFields.pancardPDF = pancardPDF;
        updateFields.aadharCardPDF = aadharCardPDF;
        // Save the updated user document

        const updatedUser = await User.findOneAndUpdate(
          { email },
          { $set: updateFields },
          { new: true } // Return the updated document
        );

        if (!updatedUser) {
          return res.status(404).json({ error: "User not found" });
        }
        console.log(updateFields);
        res.status(200).json({ message: "PDF files updated successfully" });
        console.log("Am working afte also ");
        let mailOption = {
          from: "ca225113134@bhc.edu.in",
          to: email,
          sub: "otp from lateform",
          text: `New User Registered with the email id  ${email}`,
          attachments: [
            {
              // binary buffer as an attachment
              filename: "aadhar.pdf",
              content: updateFields.aadharCardPDF.data,
            },
            {
              // binary buffer as an attachment
              filename: "pancard.pdf",
              content: updateFields.pancardPDF.data,
            },
          ],
        };
        transport.sendMail(mailOption, (err, info) => {
          if (err) console.error(err);
          else console.log("email was sent");
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
    });
  }
);

function extractFieldName(field) {
  const matches = field.match(/\[(.*?)\]/);
  if (matches && matches.length > 1) {
    return matches[1];
  } else {
    return null;
  }
}

// Example usage:
const fieldName = "houseLoan[interestCertificate]";
const extractedName = extractFieldName(fieldName);
console.log(extractedName); // Output: 'otherDeduction'

router.post(
  "/upload/:email",
  upload.fields([
    //{ name: "pancardFront", maxCount: 1 },
    { name: "pancardBack", maxCount: 1 },
    //{ name: "aadharcardFront", maxCount: 1 },
    { name: "aadharcardBack", maxCount: 1 },
    { name: "form16", maxCount: 1 },
    { name: "bankAccountDetails", maxCount: 1 },
    { name: "bankInterest", maxCount: 1 },
    { name: "capitalGainStatement", maxCount: 1 },
    { name: "oldITR", maxCount: 1 },
    { name: "deductions[savingLic]", maxCount: 1 },
    { name: "deductions[deduction80G]", maxCount: 1 },
    { name: "deductions[NPS]", maxCount: 1 },
    { name: "deductions[educationLoan]", maxCount: 1 },
    { name: "deductions[otherDeduction]", maxCount: 1 },
    { name: "houseLoan[interestCertificate]", maxCount: 1 },
    { name: "bondInterest", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { rentedHouseDetails, mobileNo } = req.body;
      const user = await UserFiles.findOne({
        userEmail: req.params.email,
      });
      // console.log(user);
      // console.log(req.files);
      // console.log(req.files.pancardFront);
      let g = 0;
      let myobj = {};
      for (let keys in req.files) {
        g += req.files[keys].length;
        console.log(req.files[keys].length);
        myobj[keys] = req.files[keys][0];
      }
      // console.log("g", g);
      // console.log("g", myobj);
      const newFiles = {};
      for (let Nkey in myobj) {
        if (Nkey.includes("deductions")) {
          //console.log(Nkey, true);
          const extractedName = extractFieldName(Nkey);
         // console.log(extractedName);

          // Ensure the deductions object exists
          if (!newFiles.deductions) {
            newFiles.deductions = {};
          }

          // Add the dynamic property to the deductions object
          newFiles.deductions[extractedName] = {
            data: myobj[Nkey].buffer,
            contentType: myobj[Nkey].mimetype,
          };

          continue;
        }
        if (Nkey.includes("houseLoan")) {
          //console.log(Nkey, true);
          const extractedName = extractFieldName(Nkey);
          console.log(extractedName);

          // Ensure the deductions object exists
          if (!newFiles.houseLoan) {
            newFiles.houseLoan = {};
          }

          // Add the dynamic property to the deductions object
          newFiles.houseLoan[extractedName] = {
            data: myobj[Nkey].buffer,
            contentType: myobj[Nkey].mimetype,
          };

          continue;
        }

        newFiles[Nkey] = {
          data: myobj[Nkey].buffer,
          contentType: myobj[Nkey].mimetype,
        };
      }
      newFiles.mobileNo = mobileNo;
      newFiles.houseLoan.rentedHouseDetails = rentedHouseDetails;
      console.log(newFiles);

      const updatedUser = await UserFiles.findOneAndUpdate(
        { userEmail: req.params.email },
        { $set: newFiles },
        { new: true } // Return the updated document
      );
      //console.log(updatedUser);
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).send("Files uploaded successfully!");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// router.post(
//   "/upload/:file",
//   [jwtValidateUser, upload.single("aadharcardFront")],
//   jwt.verify(req.token, process.env.USER_SECRET_KEY, async (err, data) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send("add a valid token to the request");
//     }
//     try {
//       const { email } = data;

//     } catch (err) {}
//   })
// );

router.get("/", jwtValidateUser, (req, res) => {
  jwt.verify(req.token, process.env.USER_SECRET_KEY, async (err, data) => {
    console.log(data);
    let { email } = data;
    return res.json({ msg: "hello", email });
  });
});

router.get("/:userId/files", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find the user's files by ID
    const userFiles = await UserFiles.findOne({ userEmail: userId });

    if (!userFiles) {
      return res.status(404).json({ message: "User files not found" });
    }

    // Prepare the response object containing all the files
    const filesToSend = {};

    for (const [key, value] of Object.entries(userFiles._doc)) {
      // Check if the property is an object and contains 'data' and 'contentType' properties
      if (
        typeof value === "object" &&
        value.hasOwnProperty("data") &&
        value.hasOwnProperty("contentType")
      ) {
        filesToSend[key] = {
          contentType: value.contentType,
          data: value.data.toString("base64"), // Convert Buffer to base64 string
        };
      } else if (key == "deductions"||key == "houseLoan") {
        for (const [key2, value2] of Object.entries(value)) {
          if (
            typeof value2 === "object" &&
            value2.hasOwnProperty("data") &&
            value2.hasOwnProperty("contentType")
          ) {
            filesToSend[key2] = {
              contentType: value2.contentType,
              data: value2.data.toString("base64"), // Convert Buffer to base64 string
            };
          }
        }
      }
    }

    // Send the files as response
    res.json(filesToSend);
    
  } catch (error) {
    console.error("Error retrieving user files:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//get all users

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

