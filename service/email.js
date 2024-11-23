const nodemailer = require("nodemailer");
const fs = require("fs");

const sendMail = (req, res, next) => {
  return next();
};
module.exports = {
  sendMail,
};
