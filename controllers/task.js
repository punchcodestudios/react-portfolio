const errorHandler = require("../middleware/handleError.js");
const { Task } = require("../models/task.js");
const { TaskStatus } = require("../utils/constants.js");

const getTasks = errorHandler(async (req, res, next) => {
  // console.log("REQ.QUERY: ", req.query);
  let data = await Task.find({});
  data = [...data.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))];
  req.data = data;
  return next();
});

const addTask = errorHandler(async (req, res, next) => {
  let task = new Task({
    title: req.body.title,
    description: req.body.description,
    dueDate: new Date(req.body.dueDate).toUTCString(),
    taskGroup: req.body.taskGroup,
    status: TaskStatus.ACTIVE,
    createdOn: new Date(Date.now()).toUTCString(),
    updatedOn: "",
    deletedOn: "",
  });

  const data = await task.save();
  req.data = [data];
  return next();
});

const completeTask = errorHandler(async (req, res, next) => {
  let data = await Task.findOneAndUpdate(
    { _id: req.body.id },
    {
      deletedOn: new Date(Date.now()).toUTCString(),
      status: TaskStatus.COMPLETE,
    },
    { new: true }
  );
  // console.log(req.data);
  req.data = [data];
  return next();
});

module.exports = {
  addTask,
  getTasks,
  completeTask,
};
