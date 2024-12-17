const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const Joi = require("joi");
const { User } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");
const authMiddleware = require("../middleware/auth");
const responseController = require("../controllers/response");
const mailController = require("../controllers/mail");

router.post(
  "/sign-up",
  authController.signUp,
  mailController.sendRegistrationConfirmation,
  responseController.sendSuccessResponse
);

router.post("/login", authController.login, authMiddleware.generateAuthTokens);

router.post("/logout", authController.logout, authMiddleware.logout);

router.post(
  "/refresh",
  authController.refreshAccessToken,
  authMiddleware.generateAuthTokens
);

module.exports = router;
