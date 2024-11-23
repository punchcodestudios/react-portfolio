const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");
const _ = require("lodash");

const userSchema = new mongoose.Schema({
  refid: {
    type: String,
  },
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  username: {
    type: String,
    required: true,
    maxlength: 50,
  },
  email: {
    type: String,
    minlength: 5,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin: {
    type: Boolean,
  },
  confirmCode: {
    type: Number,
  },
  confirmed: {
    type: Boolean,
  },
});

const User = mongoose.model("User", userSchema, "users");

function validateUser(user) {
  const schema = {
    name: Joi.string().max(50).required(),
    username: Joi.string().max(50).required(),
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(5).max(250).required(),
    confirmPassword: Joi.string().optional().allow(null),
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
