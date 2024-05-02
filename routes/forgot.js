const express = require("express");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRegistrationSchema = require("../schema/userRegistrationSchema");
// const organizerRegisterSchema = require('../Scehma/organizerRegisterSchema');
const otpSchema = require("../schema/otpSchema");
const router = express.Router();
const transport = nodemailer.createTransport({
  host: "server210.web-hosting.com",
  port: 465,
  secure: true,
  auth: {
    user: "support@lateform.com",
    pass: "support@lateform.com", //aiaiskkiszgqqyna
  },
});
//orgainzer
router.post("/forgotPassword", async (req, res) => {
  let { email } = req.body;
  if (email === "" || email === null) {
    res.status(400).send("fill out the email field");
  } else {
    let isUser = await userRegistrationSchema.findOne({ email: email });
    ///let isRegister = !isRegisterInAttendee && !isRegisterInOrganizer?false:true
    console.log(isRegister);
    if (!isUser) {
      res.status(400).send("unregistered e-mail Id!");
    } else {
      var isAlreadySent = await otpSchema.findOne({
        email: email,
        role: "forgot-password-otp",
      });
      if (!isAlreadySent) {
        let date = new Date();
        let otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
          lowerCaseAlphabets: false,
          specialChars: false,
        });
        let data = new otpSchema({
          email: email,
          otp: otp,
          createAt: date,
          expiresAt: new Date(date.getTime() + 600000 * 2),
          role: "forgot-password-otp",
        });
        await data.save();
        let mailOption = {
          from: "support@lateform.com",
          to: email,
          sub: "don't share this otp to anyone!",
          text:
            "Hi user,you are otp is here for change your password: " +
            otp +
            ", Don't share this otp to anyone.",
        };
        transport.sendMail(mailOption, (err, info) => {
          if (err) res.send("can't able to send otp! something went wrong");
          else {
            let token = jwt.sign({ email: email }, "forgot-otp-lateform");
            res.header("forgotAuth", token).send({
              msg: "check your inbox for otp",
              token: token,
            });
          }
        });
      } else {
        await otpSchema.deleteOne({
          email: email,
          role: "forgot-password-otp",
        });
        let date = new Date();
        let otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
          lowerCaseAlphabets: false,
          specialChars: false,
        });
        let data = new otpSchema({
          email: email,
          otp: otp,
          createAt: date,
          expiresAt: new Date(date.getTime() + 600000 * 2),
          role: "forgot-password-otp",
        });
        await data.save();
        let mailOption = {
          from: "support@lateform.com",
          to: email,
          sub: "don't share this otp to anyone!",
          text:
            "Hi user,you are otp is here for change your password: " +
            otp +
            ", Don't share this otp to anyone.",
        };
        transport.sendMail(mailOption, (err, info) => {
          if (err) res.send("can't able to send otp! something went wrong");
          else {
            let token = jwt.sign({ email: email }, "forgot-otp-lateform");
            res.header("forgotAuth", token).send({
              msg: "check your inbox for otp",
              token: token,
            });
          }
        });
      }
    }
  }
});
function verifyForgoter(req, res, next) {
  let token = req.header("forgotAuth");
  req.token = token;
  next();
}
router.post("/forgotPasswordValidation", verifyForgoter, async (req, res) => {
  jwt.verify(req.token, "forgot-otp-lateform", async (err, data) => {
    if (err) {
      res.status(400).send("wrong gateway attempt is happened!");
    } else {
      if (!req.body.email || !req.body.newPassword || !req.body.otp) {
        res.status(400).send("fill the form properly");
      } else {
        let { email, newPassword, otp } = req.body;
        var newPass = await bcrypt.hash(newPassword, 10);
        var isThere = await otpSchema.findOne({
          email: email,
          otp: otp,
          role: "forgot-password-otp",
        });
        if (!isThere) {
          res.status(400).send("your otp is not registerd!");
        } else {
          let currentTime = new Date();
          if (otp === isThere.otp && isThere.expiresAt > currentTime) {
            // let User = await userRegistrationSchema.findOne({
            //   email: email,
            // });

            await userRegistrationSchema.updateOne(
              { email: email },
              { $set: { password: newPass } }
            );
            await otpSchema.deleteOne({ email: email });
            res.status(200).send("your  password is changed");
          } else {
            res.status(400).send("invalid otp");
          }
        }
      }
    }
  });
});

//forgot otp

router.post("/forgotOtp", async (req, res) => {
  console.log(req.body.email);
  if (!req.body.email) {
    res.status(400).send("given data is blank!");
  } else {
    let isOtpThere = await otpSchema.findOne({
      email: req.body.email,
      role: "login-otp",
    });
    if (!isOtpThere) {
      res.status(400).send("otp is not registered");
    } else {
      let nowTime = new Date();
      let exipreTIme = new Date(nowTime.getTime() + 600000 * 2);
      let newOtp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      await otpSchema.updateOne(
        { email: req.body.email, role: "login-otp" },
        { $set: { otp: newOtp, expiresAt: exipreTIme } }
      );
      let mailOption = {
        from: "support@lateform.com",
        to: req.body.email,
        sub: "resend otp",
        text:
          "your resend otp is here: " +
          newOtp +
          ", Don't share this otp to anyone",
      };
      transport.sendMail(mailOption, (err, data) => {
        if (err) res.status(400).send("email can't send");
        else {
          res.status(200).send("check your inbox for otp");
        }
      });
    }
  }
});

module.exports = router;
