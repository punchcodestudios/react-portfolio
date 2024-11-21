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

router.post(
  "/sign-up",
  authController.signUp,
  authMiddleware.generateAuthTokens
);

router.post("/login", authController.login, authMiddleware.generateAuthTokens);

router.post(
  "/logout",
  authController.logout,
  authMiddleware.generateAuthTokens
);

router.post(
  "/refresh",
  authController.refreshAccessToken,
  authMiddleware.generateAuthTokens
);

// router.post("/sign-up", async (req, res) => {});

// router.post("/signin", async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   let user = await User.findOne({ email: req.body.email });
//   if (!user) return res.status(400).send("Invalid email or password");

//   const validPassword = await bcrypt.compare(req.body.password, user.password);
//   if (!validPassword) return res.status(400).send("Invalid email or password");

//   const token = jwt.sign(
//     { _id: this._id, isAdmin: this.isAdmin },
//     config.get("jwtPrivateKey")
//   );

//   res.cookie("token", token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     maxAge: 1 * 60 * 60 * 1000,
//   });

//   return res.status(200).json({ message: "logged in" });
// });

// function validate(signin) {
//   const schema = {
//     email: Joi.string().min(5).required().email(),
//     password: Joi.string().min(5).max(250).required(),
//   };

//   return Joi.validate(signin, schema);
// }

module.exports = router;
