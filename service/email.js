//https://dev.to/scofieldidehen/master-nodemailer-the-ultimate-guide-to-sending-emails-from-nodejs-24a3
//https://nodemailer.com/usage/
//https://www.geeksforgeeks.org/server-side-rendering-using-express-js-and-ejs-template-engine/

const nodemailer = require("nodemailer");

const sendMail = async (to, from, subject, text, html) => {
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
      to: !to ? process.env.DEFAULT_EMAIL_RECIP : to,
      from: from,
      subject: subject,
      text: text,
      html: html,
    };

    const response = await transporter.sendMail(mailOptions);
    // console.log("service/email.js:28 - ", response);
    return response;
  } catch (error) {
    // console.error("service/email.js:36 -- ", error);
    throw Error(error);
  }
};

module.exports = {
  sendMail,
};
