const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const login = require("./routes/login");
const admin = require("./routes/admin");
const blog = require("./routes/blogs");
const mailHandler = require("./routes/mailHandlers");
const linkHandler = require("./routes/embeded");
const gallery = require("./routes/gallery");


const userRegister = require("./routes/userregister");
const server = http.createServer(app);
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());
app.use("/login", login);
app.use("/user", userRegister);
app.use("/admin",admin);
app.use("/blog",blog);
app.use("/mail",mailHandler);
app.use("/link",linkHandler);
app.use("/gallery",gallery);
//app.use("/user", userRegister); 
require("dotenv").config();

app.get("/", (req, res) => res.send("Hello Broo..."));

mongoose.set("strictQuery", false);
console.log(process.env.MONGODB_URL);
mongoose.connect(process.env.MONGODB_URL, (err) => {
  if (err) console.log("db is not connected");
  else {
    console.log("db is connected");
    server.listen(process.env.PORT, (err) => {
      if (err) {
        console.log("app is not listen");
      } else {
        console.log("app is listening http://localhost:" + process.env.PORT);
        console.log(process.env.NODE_ENV);
      }
    });
  }
});

console.log(process.env.USER_SECRET_KEY);
