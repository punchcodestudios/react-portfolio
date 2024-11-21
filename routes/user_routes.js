const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const { User, validate } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middleware/auth");
const userController = require("../controllers/users");

router.get("/list", isAuthenticated, userController.getUserList);
router.get("/me", isAuthenticated, userController.getAuthenticatedUser);
router.get("/:id", isAuthenticated, userController.getUserById);

// router.get("/me", auth, async (req, res) => {
//   const user = await User.findById(req.user._id).select("-password");
//   res.send(user);
// });

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

// router.get("/list", async (req, res) => {});

// router.put("/:id", async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const user = await User.findByIdAndUpdate(
//     req.params.id,
//     { name: req.body.name },
//     {
//       new: true,
//     }
//   );

//   if (!user)
//     return res.status(404).send("The user with the given ID was not found.");

//   res.send(user);
// });

// router.delete("/:id", [auth, admin], async (req, res) => {
//   const user = await User.findByIdAndRemove(req.params.id);

//   if (!user)
//     return res.status(404).send("The user with the given ID was not found.");

//   res.send(user);
// });

module.exports = router;
