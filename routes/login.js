const express = require("express");
const Otpschema = require("../schema/otpSchema");
const UserRegister = require("../schema/userRegistrationSchema");

const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const emailvalidator = require("email-validator");
const otpSchema = require("../schema/otpSchema");

const router = express.Router();
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ca225113134@bhc.edu.in",
    pass: "goodmorning003@",
  },
});

router.post("/user", async (req, res) => {
  let isRegister = await UserRegister.findOne({ email: req.body.email });
  if (!isRegister) {
    res.status(400).send("your account is not register!");
  } else {
    let isCorrect = await bcrypt.compare(
      req.body.password,
      isRegister.password
    );
    if (isCorrect) {
      let token = jwt.sign(
        { email: req.body.email },
        process.env.USER_SECRET_KEY
      );
      console.log(token);
      res.header("auth", token).send(token);
    } else {
      res.status(400).send("incorrect password");
    }
  }
});

function jwtValidateUser(req, res, next) {
  console.log("body", req.body);
  let token = req.body.auth;
  req.token = token;
  next();
}

router.post("/generateotp", jwtValidateUser, async (req, res) => {
  console.log("token", req.token);
  jwt.verify(req.token, process.env.USER_SECRET_KEY, async (err, data) => {
    console.log(data);
    if (err) res.status(400).json({ error: err });
    else {
      let isValidEmail = emailvalidator.validate(data.email);
      if (isValidEmail) {
        let isThere = await Otpschema.findOne({
          email: data.email,
          role: "login-otp",
        });
        if (isThere) {
          let date = new Date();
          await Otpschema.deleteOne({
            email: data.email,
            role: "login-otp",
          });
          let otpNumber = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
          });
          let otpStructure = new Otpschema({
            email: data.email,
            otp: otpNumber,
            createAt: date,
            expiresAt: new Date(date.getTime() + 600000 * 2),
            role: "login-otp",
          });
          await otpStructure.save();
          let result = await Otpschema.findOne({
            email: data.email,
            role: "login-otp",
          });
          let otp = result.otp + "";
          let mailOption = {
            from: "ca225113134@bhc.edu.in",
            to: data.email,
            sub: "otp from lateform",
            text: `Don't share this otp to anyone! this otp will expires in 20 minutes, your otp is ${otp}`,
          };
          transport.sendMail(mailOption, (err, info) => {
            if (err) {
              console.error(err);

              res
                .status(400)
                .json({ error: "some thing went wrong! while sending email" });
            } else res.status(200).json({ message: "email was sent" });
          });
        } else {
          let date = new Date();
          let otpNumber = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
          });
          let otpStructure = new Otpschema({
            email: data.email,
            otp: otpNumber,
            createAt: date,
            expiresAt: new Date(date.getTime() + 600000 * 2),
            role: "login-otp",
          });
          await otpStructure.save();
          let result = await Otpschema.findOne({
            email: data.email,
            role: "login-otp",
          });
          let otp = result.otp + "";
          let mailOption = {
            from: "ca225113134@bhc.edu.in",
            to: data.email,
            sub: "otp from lateform",
            text: `Don't share this otp to anyone! this otp will expires in 20 minutes, your otp is ${otp}`,
          };
          transport.sendMail(mailOption, (err, info) => {
            if (err)
              res
                .status(400)
                .json({ error: "some thing went wrong! while sending email" });
            else res.status(200).json({ error: "email was sent" });
          });
        }
      } else {
        res.status(400).json({ error: "invalid email" });
      }
    }
  });
});

router.post("/validateOtp", jwtValidateUser, async (req, res) => {
  console.log("lkf", req.token);
  jwt.verify(req.token, process.env.USER_SECRET_KEY, async (err, data) => {
    console.log(data);
    if (err) return res.status(400).send("error don't know");

    let { clientSideOtp } = req.body;

    if (!clientSideOtp) return res.status(400).send("enter otp");

    let originalOtp = await otpSchema.findOne({
      email: data.email,
      role: "login-otp",
    });
    console.log("original", originalOtp?.otp);

    // if (!originalOtp) return res.status(400).send("something went wrong!");

    let date = new Date();
    console.log(date);
    console.log(date < originalOtp.expiresAt);
    console.log(
      "broo",
      clientSideOtp == originalOtp.otp && date < originalOtp.expiresAt
    );
    if (clientSideOtp == originalOtp.otp && date < originalOtp.expiresAt) {
      await Otpschema.deleteOne({ email: data.email, role: "login-otp" });
      let token = jwt.sign(
        { otp: clientSideOtp, email: data.email },
        process.env.USER_SECRET_KEY
      );
      res.status(200).json({ token });
    } else {
      res.status(400).send("Login time out . Please Relogin");
    }
  });
});

module.exports = router;

// "otryipifrdqeyqdc"
