const ejs = require("ejs");
const path = require("path");
const errorHandler = require("../middleware/handleError.js");
const sgMail = require("@sendgrid/mail");
const createError = require("http-errors");
sgMail.setApiKey(
  "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"
);

const sendText = errorHandler(async (req, res, next) => {
  await send(req, res, next, { ...req.body });
});

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

const sendgrid = async (req, res, next) => {
  sgMail
    .send(msg)
    .then(() => console.log("email sent"))
    .catch((error) => {
      console.error(error);
    });
};

const sendRegistrationConfirmation = errorHandler(async (req, res, next) => {
  // console.log("sendRegistrationConfirmation", req.data);
  // console.log("sendRegistrationConfirmation", req.meta);

  try {
    const msg = {
      to: "pschandler@gmail.com", // ${req.data.email}
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

module.exports = {
  sendText,
  sendContact,
  previewContact,
  sendgrid,
  sendRegistrationConfirmation,
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
