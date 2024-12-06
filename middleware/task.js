const express = require("express");
const router = express.Router();

const addTask = async (req, res, next) => {
  console.log("middleware.send:5");
  return next();
};

const getTasks = async (req, res, next) => {
  console.log("middleware.send:10");
  return next();
};

const completeTask = async (req, res, next) => {
  console.log("middleware.sendContact:15");
  return next();
};

module.exports = {
  addTask,
  getTasks,
  completeTask,
};
