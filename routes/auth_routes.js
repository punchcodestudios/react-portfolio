const bcrypt = require("bcrypt");
const _ = require("lodash");
const Joi = require("joi");
const { User } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = User.generateAuthToken();
  res.send(token);
});

function validate(login) {
  const schema = {
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(5).max(250).required(),
  };

  return Joi.validate(login, schema);
}

module.exports = router;
