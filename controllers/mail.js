const mailClient = require("../service/email.js");
const ejs = require("ejs");
const path = require("path");
const errorHandler = require("../middleware/handleError.js");

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

const send = async (req, res, next, data) => {
  await mailClient.sendMail(
    data.to,
    data.from,
    data.subject,
    data.text,
    data.html
  );

  res.status(200).json({ status: 200, message: "Email was successfully sent" });
  // console.log("controllers/mail.js", response);
};

module.exports = {
  sendText,
  sendContact,
  previewContact,
};
