const express = require("express");
const router = express.Router();
const mailController = require("../controllers/mail");
const mailMiddleware = require("../middleware/mail");

router.post("/send", mailController.sendText, mailMiddleware.sendText);
router.post(
  "/send-contact",
  mailController.sendContact,
  mailMiddleware.sendContact
);
router.get(
  "/preview-contact",
  mailController.previewContact,
  mailMiddleware.previewContact
);

module.exports = router;
