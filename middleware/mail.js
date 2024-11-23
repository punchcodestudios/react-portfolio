const express = require("express");
const router = express.Router();

const send = async (req, res, next) => {
  return next();
};

module.exports = {
  send,
};
