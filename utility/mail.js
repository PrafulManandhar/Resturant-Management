const nodemailer = require("nodemailer");
const mailConfig = {
  service: "gmail",
  //TODO : Change to secure :TRUE
  secure: false,
  port: 25,
  auth: {
    user: "prabinmanandhar20@gmail.com",
    pass: "egodarkfallqwerty"
  },
  tls: {
    rejectUnauthorized: false
  }
};
const transporter = nodemailer.createTransport(mailConfig);

module.exports = transporter;
