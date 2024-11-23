const sendMail = require("../service/email.js");

// const send = async (req, res, next) => {
//   await clearTokens(req, res, next);
//   return res.sendStatus(204);
// };

const send = async (req, res, next) => {
  const { name, from, subject, message } = req.body;
  try {
    await sendMail(name, "punchcodestudios.com", from, subject, message);
    return res.status(200).json({ message: "Email successfully sent" });
  } catch (error) {
    console.error("Error sending email: ", error);
    return next(error);
  }
};

module.exports = {
  send,
};
