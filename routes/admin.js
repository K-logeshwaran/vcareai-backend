const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//const { jwtValidateUser } = require("../commons");
const userRegistrationSchema = require("../schema/userRegistrationSchema");
const { USER_STATUS } = require("../config");
const Employee = require("../schema/employee");

router.get("/", async (req, res) => {
  const users = await userRegistrationSchema.find({ assigned: false });

  console.log(users);
  /*
   fullName: 'Loki',
    email: 'animede3@gmail.com',
    password: '$2b$10$.t5FYQrIj2u5ZT809bsilerB.UMTB7p/OF13Wxx/RZsTuNFZE4nGi',
    recoveryEmail: 'animedev003@gmail.com',
    status: 'NEWLY REGISTERED NOW ONLY',
    assigned: false,
    assignedTo: null,
   */
  let filterArr = users.map((v) => {
    return { id: v._id, email: v.email, fullName: v.fullName };
  });

  res.json(filterArr);
});

router.put("/usersStat", async (req, res) => {
  let { empId } = req.body;
  console.log(empId);
  const users = await userRegistrationSchema.find({ assignedTo: empId });

  console.log(users);
  /*
   fullName: 'Loki',
    email: 'animede3@gmail.com',
    password: '$2b$10$.t5FYQrIj2u5ZT809bsilerB.UMTB7p/OF13Wxx/RZsTuNFZE4nGi',
    recoveryEmail: 'animedev003@gmail.com',
    status: 'NEWLY REGISTERED NOW ONLY',
    assigned: false,
    assignedTo: null,
   */
  if (users.length == 0) {
    return res.status(404).json({ msg: "No Task Assigned!" });
  }
  let filterArr = users.map((v) => {
    return {
      id: v._id,
      email: v.email,
      fullName: v.fullName,
      status: v.status,
    };
  });

  res.json(filterArr);
});

router.put("/assign", async (req, res) => {
  console.log(req.body);
  //   if (!req.body.userId || req.body.empObjId)
  //     return res.status(400).send("Required fields missing!");
  console.log("Voooooooooooooooooo");
  const { userId, empObjId } = req.body;
  const user = await userRegistrationSchema.updateOne(
    { _id: userId },
    {
      $set: {
        assignedTo: empObjId,
        assigned: true,
        status: USER_STATUS.REQUEST_BENDING,
      },
    }
  );
  return res.status(200).send("User Updated Success fully");
});

router.post("/addemployees", async (req, res) => {
  try {
    // Extract data from the request body
    const { fullName, employeeId, email } = req.body;

    // Create a new employee object
    const newEmployee = new Employee({
      fullName,
      employeeId,
      email,
      jobs: [], // Assuming you want to add a job with the provided userId
    });

    // Save the new employee to the database
    const savedEmployee = await newEmployee.save();

    // Respond with the saved employee data
    res.status(201).json(savedEmployee);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/employees", async (req, res) => {
  try {
    // Fetch all employees from the database
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { adminId, password } = req.body;
  const access = await bcrypt.compare(password, process.env.ADMIN_PASS);
  const idCheck = adminId === process.env.ADMIN_ID;
  console.log(access, idCheck);
  if (access && idCheck) {
    let token = jwt.sign({ admin: adminId }, process.env.USER_SECRET_KEY);
    console.log(token);
    res.header("auth", token).json({ token });
  } else {
    res.status(400).json({ msg: "Access Denied !" });
  }
});




//embeded links handle 






module.exports = router;
