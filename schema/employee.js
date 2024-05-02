const mongoose = require("mongoose");

const userInfo = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

const EmployeeSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  employeeId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  jobs: [userInfo],
});
module.exports = mongoose.model("EmployeeSchema", EmployeeSchema);
