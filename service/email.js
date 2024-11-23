//https://dev.to/scofieldidehen/master-nodemailer-the-ultimate-guide-to-sending-emails-from-nodejs-24a3
//https://nodemailer.com/usage/

const nodemailer = require("nodemailer");
const fs = require("fs");

const sendMail = async (name, to, from, subject, message) => {
  console.log("sendMail");
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_CLIENT_REFRESH_TOKEN,
      },
    });
    const mailOptions = {
      from: from,
      to: "pschandler@gmail.com",
      subject: subject,
      text: `${name} has sent a message: ${message}`,
      html: `<h1>${name}</h1><p>has sent a message:</br>${message}</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email Sent!!");
      }
    });
    return true;
  } catch (error) {
    console.error("Error: ", error);
    return false;
  }
};

module.exports = {
  sendMail,
};
