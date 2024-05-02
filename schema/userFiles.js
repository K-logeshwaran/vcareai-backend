var mongoose = require("mongoose");

var userFiles = mongoose.Schema({
  userEmail:{
    type: String,
    required: true,
  },
  pancardFront: {
    data: Buffer,
    contentType: String,
  },
  pancardBack: {
    data: Buffer,
    contentType: String,
  },
  aadharCardFront: {
    data: Buffer,
    contentType: String,
  },
  aadharCardBack: {
    data: Buffer,
    contentType: String,
  },
  mobileNo: String,
  form16: {
    data: Buffer,
    contentType: String,
  },
  bankAccountDetails: {
    data: Buffer,
    contentType: String,
  },
  bankInterest: {
    data: Buffer,
    contentType: String,
  },
  capitalGainStatement: {
    data: Buffer,
    contentType: String,
  },
  oldITR: {
    data: Buffer,
    contentType: String,
  },
  deductions: {
    savingLic: {
      data: Buffer,
      contentType: String,
    },
    deduction80G: {
      data: Buffer,
      contentType: String,
    },
    NPS: {
      data: Buffer,
      contentType: String,
    },
    educationLoan: {
      data: Buffer,
      contentType: String,
    },
    otherDeduction: {
      data: Buffer,
      contentType: String,
    },
  },
  houseLoan: {
    interestCertificate: {
      data: Buffer,
      contentType: String,
    },
    rentedHouseDetails: String,
  },
  bondInterest: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("userFiles", userFiles);


/*
[Object: null prototype] {
  mobileNo: '122222222222222222',
  houseLoan: [Object: null prototype] { rentedHouseDetails: 'ssssssssssssss' }
}
[Object: null prototype] {
  'deductions[savingLic]': [
    {
      fieldname: 'deductions[savingLic]',
      originalname: 'Screenshot (24).png',
      encoding: '7bit',
      mimetype: 'image/png',
      buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 07 80 00 00 04 38 08 06 00 00 00 e8 d3 c1 43 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 04 ... 2225749 more bytes>,
      size: 2225799
    }
  ],
  'deductions[deduction80G]': [
    {
      fieldname: 'deductions[deduction80G]',
      originalname: 'Screenshot (26).png',
      encoding: '7bit',
      mimetype: 'image/png',
      buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 07 80 00 00 04 38 08 06 00 00 00 e8 d3 c1 43 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 04 ... 383755 more bytes>,
      size: 383805
    }
  ],
  'deductions[NPS]': [
    {
      fieldname: 'deductions[NPS]',
      originalname: 'Screenshot (13).png',
      encoding: '7bit',
      mimetype: 'image/png',
      buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 07 80 00 00 04 38 08 06 00 00 00 e8 d3 c1 43 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 04 ... 203631 more bytes>,
      size: 203681
    }
  ],
  'deductions[educationLoan]': [
    {
      fieldname: 'deductions[educationLoan]',
      originalname: 'Screenshot (17).png',
      encoding: '7bit',
      mimetype: 'image/png',
      buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 07 80 00 00 04 38 08 06 00 00 00 e8 d3 c1 43 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 04 ... 369591 more bytes>,
      size: 369641
    }
  ],
  'deductions[otherDeduction]': [
    {
      fieldname: 'deductions[otherDeduction]',
      originalname: 'Screenshot (15).png',
      encoding: '7bit',
      mimetype: 'image/png',
      buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 07 80 00 00 04 38 08 06 00 00 00 e8 d3 c1 43 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 04 ... 991820 more bytes>,
      size: 991870
    }
  ],
  'houseLoan[interestCertificate]': [
    {
      fieldname: 'houseLoan[interestCertificate]',
      originalname: 'Screenshot (24).png',
      encoding: '7bit',
      mimetype: 'image/png',
      buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 07 80 00 00 04 38 08 06 00 00 00 e8 d3 c1 43 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 04 ... 2225749 more bytes>,
      size: 2225799
    }
  ]
}
[Object: null prototype] {}
[Object: null prototype] {
  pancardFront: [
    {
      fieldname: 'pancardFront',
      originalname: 'Screenshot (24).png',
      encoding: '7bit',
      mimetype: 'image/png',
      buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 07 80 00 00 04 38 08 06 00 00 00 e8 d3 c1 43 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 04 ... 2225749 more bytes>,
      size: 2225799
    }
  ],
  pancardBack: [
    {
      fieldname: 'pancardBack',
      originalname: 'Screenshot (26).png',
      encoding: '7bit',
      mimetype: 'image/png',
      buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 07 80 00 00 04 38 08 06 00 00 00 e8 d3 c1 43 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 04 ... 383755 more bytes>,
      size: 383805
    }
  ],
  aadharcardFront: [
    {
      fieldname: 'aadharcardFront',
      originalname: 'Screenshot (11).png',
      encoding: '7bit',
      mimetype: 'image/png',
      buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 07 80 00 00 04 38 08 06 00 00 00 e8 d3 c1 43 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 04 ... 275216 more bytes>,
      size: 275266
    }
  ],
  aadharcardBack: [
    {
      fieldname: 'aadharcardBack',
      originalname: 'Screenshot (24).png',
      encoding: '7bit',
      mimetype: 'image/png',
      buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 07 80 00 00 04 38 08 06 00 00 00 e8 d3 c1 43 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 04 ... 2225749 more bytes>,
      size: 2225799
    }
  ],
  form16: [
    {
      fieldname: 'form16',
      originalname: 'Screenshot (24).png',
      encoding: '7bit',
      mimetype: 'image/png',
      buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 07 80 00 00 04 38 08 06 00 00 00 e8 d3 c1 43 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 04 ... 2225749 more bytes>,
      size: 2225799
    }
  ],
  bankAccountDetails: [
    {
      fieldname: 'bankAccountDetails',
      originalname: 'Screenshot (26).png',
      encoding: '7bit',
      mimetype: 'image/png',
      buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 07 80 00 00 04 38 08 06 00 00 00 e8 d3 c1 43 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 04 ... 383755 more bytes>,
      size: 383805
    }
  ],
  bankInterest: [
    {
      fieldname: 'bankInterest',
      originalname: 'Screenshot (25).png',
      encoding: '7bit',
      mimetype: 'image/png',
      buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 07 80 00 00 04 38 08 06 00 00 00 e8 d3 c1 43 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 04 ... 1372608 more bytes>,
      size: 1372658
    }
  ],
  capitalGainStatement: [
    {
      fieldname: 'capitalGainStatement',
      originalname: 'Screenshot (26).png',
      encoding: '7bit',
      mimetype: 'image/png',
      buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 07 80 00 00 04 38 08 06 00 00 00 e8 d3 c1 43 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 04 ... 383755 more bytes>,
      size: 383805
    }
  ],
  oldITR: [
    {
      fieldname: 'oldITR',
      originalname: 'Screenshot (26).png',
      encoding: '7bit',
      mimetype: 'image/png',
      buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 07 80 00 00 04 38 08 06 00 00 00 e8 d3 c1 43 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 04 ... 383755 more bytes>,
      size: 383805
    }
  ],
  'deductions[savingLic]': [
    {
      fieldname: 'deductions[savingLic]',
      originalname: 'Screenshot (24).png',
      encoding: '7bit',
      mimetype: 'image/png',
      buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 07 80 00 00 04 38 08 06 00 00 00 e8 d3 c1 43 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 04 ... 2225749 more bytes>,
      size: 2225799
    }
  ],
  'deductions[deduction80G]': [
    {
      fieldname: 'deductions[deduction80G]',
      originalname: 'Screenshot (26).png',
      encoding: '7bit',
      mimetype: 'image/png',
      buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 07 80 00 00 04 38 08 06 00 00 00 e8 d3 c1 43 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 04 ... 383755 more bytes>,
      size: 383805
    }
  ],
  'deductions[NPS]': [
    {
      fieldname: 'deductions[NPS]',
      originalname: 'Screenshot (13).png',
      encoding: '7bit',
      mimetype: 'image/png',
      buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 07 80 00 00 04 38 08 06 00 00 00 e8 d3 c1 43 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 04 ... 203631 more bytes>,
      size: 203681
    }
  ],
  'deductions[educationLoan]': [
    {
      fieldname: 'deductions[educationLoan]',
      originalname: 'Screenshot (17).png',
      encoding: '7bit',
      mimetype: 'image/png',
      buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 07 80 00 00 04 38 08 06 00 00 00 e8 d3 c1 43 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 04 ... 369591 more bytes>,
      size: 369641
    }
  ],
  'deductions[otherDeduction]': [
    {
      fieldname: 'deductions[otherDeduction]',
      originalname: 'Screenshot (15).png',
      encoding: '7bit',
      mimetype: 'image/png',
      buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 07 80 00 00 04 38 08 06 00 00 00 e8 d3 c1 43 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 04 ... 991820 more bytes>,
      size: 991870
    }
  ],
  'houseLoan[interestCertificate]': [
    {
      fieldname: 'houseLoan[interestCertificate]',
      originalname: 'Screenshot (24).png',
      encoding: '7bit',
      mimetype: 'image/png',
      buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 07 80 00 00 04 38 08 06 00 00 00 e8 d3 c1 43 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 04 ... 2225749 more bytes>,
      size: 2225799
    }
  ],
  bondInterest: [
    {
      fieldname: 'bondInterest',
      originalname: 'Screenshot (24).png',
      encoding: '7bit',
      mimetype: 'image/png',
      buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 07 80 00 00 04 38 08 06 00 00 00 e8 d3 c1 43 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 04 ... 2225749 more bytes>,
      size: 2225799
    }
  ]
}
 */

/*
fieldname: 'bondInterest',
    originalname: 'Screenshot (24).png',
    encoding: '7bit',
    mimetype: 'image/png',
    buffer: <Buffer 89 5 */


    // router.post(
    //   "/updatePdf",
    //   [
    //     jwtValidateUser,
    //     upload.fields([
    //       { name: "pancard", maxCount: 1 },
    //       { name: "aadharcard", maxCount: 1 },
    //     ]),
    //   ],
    //   async (req, res) => {
    //     jwt.verify(req.token, process.env.USER_SECRET_KEY, async (err, data) => {
    //       if (err) {
    //         console.error(err);
    //         return res.status(500).send("add a valid token to the request");
    //       }
    //       try {
    //         const { email } = data;
    //         let updateFields = {};
    
    //         // Check if the user exists
    //         const user = await User.findOne({
    //           email,
    //         });
    //         if (!user) {
    //           return res.status(404).json({ error: "User not found" });
    //         }
    //         console.log(user.pancardPDF);
    //         console.log("lkf", req.files);
    //         console.log("lkf", user);
    //         // Update Pan card details
    //         let pancardPDF = {};
    //         if (req.files && req.files["pancard"]) {
    //           const panF = req.files["pancard"][0];
    //           console.log("panF", panF.buffer);
    //           pancardPDF.data = panF.buffer;
    //           pancardPDF.contentType = panF.mimetype;
    //         } else {
    //           pancardPDF = user.pancardPDF;
    //         }
    
    //         // Update Aadhar card details
    //         let aadharCardPDF = {};
    //         if (req.files && req.files["aadharcard"]) {
    //           const aadharF = req.files["aadharcard"][0];
    //           aadharCardPDF.data = aadharF.buffer;
    //           aadharCardPDF.contentType = aadharF.mimetype;
    //         } else {
    //           aadharCardPDF = user.aadharCardPDF;
    //         }
    
    //         // Update other fields if needed
    //         updateFields.panNumber = req.body.panNumber || user.panNumber;
    //         updateFields.aadharNumber = req.body.aadharNumber || user.aadharNumber;
    //         updateFields.pancardPDF = pancardPDF;
    //         updateFields.aadharCardPDF = aadharCardPDF;
    //         // Save the updated user document
    
    //         const updatedUser = await User.findOneAndUpdate(
    //           { email },
    //           { $set: updateFields },
    //           { new: true } // Return the updated document
    //         );
    
    //         if (!updatedUser) {
    //           return res.status(404).json({ error: "User not found" });
    //         }
    //         console.log(updateFields);
    //         res.status(200).json({ message: "PDF files updated successfully" });
    //         console.log("Am working afte also ");
    //         let mailOption = {
    //           from: "ca225113134@bhc.edu.in",
    //           to: email,
    //           sub: "otp from lateform",
    //           text: `New User Registered with the email id  ${email}`,
    //           attachments: [
    //             {
    //               // binary buffer as an attachment
    //               filename: "aadhar.pdf",
    //               content: updateFields.aadharCardPDF.data,
    //             },
    //             {
    //               // binary buffer as an attachment
    //               filename: "pancard.pdf",
    //               content: updateFields.pancardPDF.data,
    //             },
    //           ],
    //         };
    //         transport.sendMail(mailOption, (err, info) => {
    //           if (err) console.error(err);
    //           else console.log("email was sent");
    //         });
    //       } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ error: "Internal server error" });
    //       }
    //     });
    //   }
    // );

/*

  try {
      const user = await UserFiles.findOne({
        userEmail: req.params.email,
      });
      console.log(user);
      console.log(req.files);
      console.log(req.files.pancardFront);
      let g = 0;
      let myobj = {};
      for (let keys in req.files) {
        g += req.files[keys].length;
        console.log(req.files[keys].length);
        myobj[keys] = req.files[keys][0];
      }
      console.log("g", g);
      console.log("g", myobj);
      const newFiles = {};
      for (let Nkey in myobj) {
        if (Nkey.includes("deductions")) {
          console.log(Nkey, true);
          const extractedName = extractFieldName(Nkey);
          console.log(extractedName);

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
          console.log(Nkey, true);
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
      console.log(newFiles);

      const updatedUser = await UserFiles.findOneAndUpdate(
        { userEmail: req.params.email },
        { $set: newFiles },
        { new: true } // Return the updated document
      );
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      

      res.status(200).send("Files uploaded successfully!");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }


 */