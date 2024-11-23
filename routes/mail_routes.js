const express = require("express");
const router = express.Router();
const mailController = require("../controllers/mail");
const mailMiddleware = require("../middleware/mail");

router.post("/send", mailController.send, mailMiddleware.send);

module.exports = router;
