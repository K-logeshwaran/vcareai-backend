// var mongoose = require("mongoose");
// var userRegistrationSchema = mongoose.Schema({
//   fullName: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   recoveryEmail: {
//     type: String,
//     required: true,
//   },
//   pancardFront: {
//     data: Buffer, // Binary data for Pancard PDF
//     contentType: String, // Mime type of the PDF
//   },
//   aadharCardFront: {
//     data: Buffer, // Binary data for Aadhar card PDF
//     contentType: String, // Mime type of the PDF
//   },
//   panCardBack: {
//     data: Buffer, // Binary data for Pancard PDF
//     contentType: String, // Mime type of the PDF
//   },
//   aadharCardBack: {
//     data: Buffer, // Binary data for Pancard PDF
//     contentType: String, // Mime type of the PDF
//   },
//   status: {
//     type: String,
//   },
//   assigned: {
//     type: Boolean,
//   },
//   assignedTo: {
//     type: mongoose.Types.ObjectId,
//   },
// });
// module.exports = mongoose.model(
//   "userRegistrationSchema",
//   userRegistrationSchema
// );

var mongoose = require("mongoose");

var userRegistrationSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  recoveryEmail: {
    type: String,
    required: true,
  },
  mobileNo: String,

  status: String,
  assigned: Boolean,
  assignedTo: mongoose.Types.ObjectId,
});

module.exports = mongoose.model(
  "userRegistrationSchema",
  userRegistrationSchema
);
