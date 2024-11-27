const errorHandler = require("../middleware/handleError.js");
const { Task } = require("../models/task.js");

const addTask = errorHandler(async (req, res, next) => {
  console.log("HERE WE ARE: ", req.body);
  let task = new Task({
    title: req.body.title,
    description: req.body.description,
    addDate: new Date(Date.now()),
    dueDate: req.body.dueDate,
    completedDate: "",
    taskGroupRefid: req.body.taskGroupRefid,
  });

  console.log("TASK: ", task);
  data = await task.save();
  return res.status(200).json({ data });
});

const getTasks = errorHandler(async (req, res, next) => {
  let data = await Task.find({});
  console.log("getTasks: ", data);
  return res.status(200).send(data);
});

module.exports = {
  addTask,
  getTasks,
};
