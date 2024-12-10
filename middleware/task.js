const express = require("express");
const router = express.Router();

const addTask = async (req, res, next) => {
  console.log("tasks.middleware.send:5");
  return next();
};

const getTasks = async (req, res, next) => {
  console.log("tasks.middleware.send:10");
  const tasks = [...req.data];
  const totalCount = req.totalCount;
  const activeCount = req.activeCount;
  try {
    return res.status(200).json({
      content: [...tasks],
      totalCount,
      activeCount,
    });
  } catch (error) {
    return next(error);
  }
};

const completeTask = async (req, res, next) => {
  console.log("tasks.middleware.sendContact:15");
  return next();
};

module.exports = {
  addTask,
  getTasks,
  completeTask,
};
