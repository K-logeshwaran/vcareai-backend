const express = require("express");
const nodemailer = require("nodemailer");
const JobApplication = require("../schema/application");
const router = express.Router();
const ServiceRequest = require("../schema/serviceRequest");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ca225113134@bhc.edu.in",
    pass: "goodmorning003@",
  },
});

router.post("/appointment", (req, res) => {
  let { name, email, phno, message } = req.body;

  let mailOption = {
    from: "ca225113134@bhc.edu.in",
    to: process.env.ADMIN_EMAIL,
    sub: "New Appointment Request!",
    html: `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; padding: 20px;">
<table style="border-spacing: .5rem;border: 1px  solid black;" border="1"  cellpadding="0" cellspacing="0" width="100%"
style="max-width: 600px; margin: 0 auto; background-color: #fff; border: 1px solid #ddd; border-radius: 5px;">
<tr>
  <td style="text-align: center; padding: .3rem; font-weight: bold; font-size: 1.2rem;">Name</td>
  <td style="text-align: center; padding: .3rem;font-weight: bold;font-size: 1.2rem;">${name}</td>
</tr>
<tr >
  <td style="text-align: center; padding: .3rem; font-weight: bold; font-size: 1.2rem;">Email</td>
  <td style="text-align: center; padding: .3rem;font-weight: bold;font-size: 1.2rem;">${email}</td>
</tr>
<tr>
  <td style="text-align: center; padding: .3rem; font-weight: bold; font-size: 1.2rem;">Phone No</td>
  <td style="text-align: center; padding: .3rem;font-weight: bold;font-size: 1.2rem;">${phno}</td>
</tr>
<tr>
  <td style="text-align: center; padding: .3rem; font-weight: bold; font-size: 1.2rem;">Message</td>
  <td style="text-align: center; padding: .3rem;font-weight: bold;font-size: 1.2rem;">${message}</td>
</tr>
</table>

</body>
</html>     

    `,
  };

  transport.sendMail(mailOption, (err, info) => {
    if (err)
      res
        .status(400)
        .json({ error: "some thing went wrong! while sending email" });
    else res.status(200).json({ msg: "email was sent" });
  });
});

router.post("/submit-application", async (req, res) => {
  try {
    // Extract data from request body
    const { name, email, phno, message, position } = req.body;
    const phone = phno,
      otherDetails = message;
    console.log(name, email, phno, message, position);

    // Create a new instance of the JobApplication model
    const newJobApplication = new JobApplication({
      name,
      email,
      phone,
      position,
      otherDetails,
    });

    // Save the job application data to the database
    await newJobApplication.save();

    // Respond with success message
    res.status(201).json({ message: "Job application submitted successfully" });
    let mailOption = {
      from: "ca225113134@bhc.edu.in",
      to: process.env.ADMIN_EMAIL,
      sub: "New Appointment Request!",
      html: `
          <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Template</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; padding: 20px;">
      <h1>New Applicant</h1>
      <table style="border-spacing: .5rem;border: 1px  solid black;" border="1"  cellpadding="0" cellspacing="0" width="100%"
      style="max-width: 600px; margin: 0 auto; background-color: #fff; border: 1px solid #ddd; border-radius: 5px;">
      <tr>
        <td style="text-align: center; padding: .3rem; font-weight: bold; font-size: 1.2rem;">Name</td>
        <td style="text-align: center; padding: .3rem;font-weight: bold;font-size: 1.2rem;">${name}</td>
      </tr>
      <tr >
        <td style="text-align: center; padding: .3rem; font-weight: bold; font-size: 1.2rem;">Email</td>
        <td style="text-align: center; padding: .3rem;font-weight: bold;font-size: 1.2rem;">${email}</td>
      </tr>
      <tr>
        <td style="text-align: center; padding: .3rem; font-weight: bold; font-size: 1.2rem;">Phone No</td>
        <td style="text-align: center; padding: .3rem;font-weight: bold;font-size: 1.2rem;">${phno}</td>
      </tr>
      <tr>
        <td style="text-align: center; padding: .3rem; font-weight: bold; font-size: 1.2rem;">Position</td>
        <td style="text-align: center; padding: .3rem;font-weight: bold;font-size: 1.2rem;">${position}</td>
      </tr>
      <tr>
        <td style="text-align: center; padding: .3rem; font-weight: bold; font-size: 1.2rem;">other Details</td>
        <td style="text-align: center; padding: .3rem;font-weight: bold;font-size: 1.2rem;">${otherDetails}</td>
      </tr>
      </table>
      
      </body>
      </html>     
      
          `,
    };

    transport.sendMail(mailOption, (err, info) => {
      if (err)
        res
          .status(400)
          .json({ error: "some thing went wrong! while sending email" });
      else res.status(200).json({ msg: "email was sent" });
    });
  } catch (err) {
    // Handle errors
    console.error("Error submitting job application:", err);
    res.status(500).json({ error: "Failed to submit job application" });
  }
});

router.post("/submit-service-request", async (req, res) => {
  try {
    // Extract data from request body
    console.log(req.body);
    const { email, phoneNumber, service } = req.body;
    console.log(email, phoneNumber, service );
    // Create a new instance of the ServiceRequest model
    const newServiceRequest = new ServiceRequest({
      email,
      phoneNumber,
      service,
    });

    // Save the service request data to the database
    await newServiceRequest.save();

    // Respond with success message
    res.status(201).json({ message: "Service request submitted successfully" });
  } catch (err) {
    // Handle errors
    console.error("Error submitting service request:", err);
    res.status(500).json({ error: "Failed to submit service request" });
  }
});
module.exports = router;
