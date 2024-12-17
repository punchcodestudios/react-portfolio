const ejs = require("ejs");
const path = require("path");
const errorHandler = require("../middleware/handleError.js");
const createError = require("http-errors");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.PUNCHCODESTUDIOS_SENDGRID_API_KEY);

const sendContact = errorHandler(async (req, res, next) => {
  const { to, name, from, subject, text } = req.body;

  const html = await ejs.renderFile(
    path.resolve(__dirname, "..") + "/views/contact.ejs",
    { data: { name: name, from: from, subject: subject, text: text } }
  );

  const data = { ...req.body, html };
  await send(req, res, next, data);
});

const previewContact = async (req, res, next) => {
  res.render(path.resolve(__dirname, "..") + "/views/contact.ejs", {
    data: {
      name: "name",
      from: "from",
      subject: "SUBJECT",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  });
};

const sendRegistrationConfirmation = errorHandler(async (req, res, next) => {
  // console.log("sendRegistrationConfirmation", req.data);
  // console.log("sendRegistrationConfirmation", req.meta);

  try {
    const msg = {
      to: req.data.email,
      from: "admin@punchcodestudios.com",
      subject: "EMAIL VERIFICATION CODE - punchcodestudios.com",
      text: `Your verification code is ${req.data.confirmCode}. Please return to the application to complete your registration. Thank you.`,
      html: `<h1>Hello ${req.data.username} </h1>
      Your verification is <strong>${req.data.confirmCode}</strong>
      <p>Please enter this code into the application to confirm your registration.</p>
      <p>Thank you for your interest in punchcodestudios.com.</p>`,
    };
    sgMail
      .send(msg)
      .then(() => {
        return next();
      })
      .catch((error) => {
        return next(createError(500, `Error sending email: ${error}`));
      });
  } catch (error) {
    return next(createError(418, `Error generating email template: ${error}`));
  }
});

const sendPasswordReset = errorHandler(async (req, res, next) => {
  try {
    const msg = {
      to: req.data.email, // ${req.data.email}
      from: "admin@punchcodestudios.com",
      subject: "PASSWORD RESET - punchcodestudios.com",
      text: `Your verification code is ${req.data.confirmCode}. Please return to the application to reset your password. Thank you.`,
      html: `<h1>Hello ${req.data.username} </h1>
      Your verification is <strong>${req.data.confirmCode}</strong>
      <p>Please enter this code into the application to reset your password.</p>
      <p>Thank you for your interest in punchcodestudios.com.</p>`,
    };
    sgMail
      .send(msg)
      .then(() => {
        return next();
      })
      .catch((error) => {
        return next(createError(500, `Error sending email: ${error}`));
      });
  } catch (error) {
    return next(createError(418, `Error generating email template: ${error}`));
  }
});

module.exports = {
  sendContact,
  previewContact,
  sendRegistrationConfirmation,
  sendPasswordReset,
};

const send = async (req, res, next, data) => {
  sgMail
    .send(msg)
    .then(() => {
      return next();
    })
    .catch((error) => {
      return next(createError(500, `Error sending email: ${error}`));
    });
};
