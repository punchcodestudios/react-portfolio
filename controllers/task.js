const errorHandler = require("../middleware/handleError.js");
const { Task } = require("../models/task.js");

const getTasks = errorHandler(async (req, res, next) => {
  let data = await Task.find({});
  let filteredData = [
    ...data.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)),
  ];
  // if (req.query.showActive == "true") {
  //   filteredData = [
  //     ...data
  //       .filter((x) => !x.completedDate)
  //       .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)),
  //     ...filteredData,
  //   ];
  // }
  // if (req.query.showCompleted == "true") {
  //   filteredData = [
  //     ...filteredData,
  //     ...data
  //       .filter((x) => x.completedDate)
  //       .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)),
  //   ];
  // }
  return res.status(200).send({ content: filteredData });
});

const addTask = errorHandler(async (req, res, next) => {
  let task = new Task({
    title: req.body.title,
    description: req.body.description,
    addDate: new Date(Date.now()).toUTCString(),
    dueDate: new Date(req.body.dueDate).toUTCString(),
    completedDate: "",
    taskGroupRefid: req.body.taskGroupRefid,
  });

  data = await task.save();
  return res.status(200).json(data);
});

const completeTask = errorHandler(async (req, res, next) => {
  let data = await Task.findOneAndUpdate(
    { _id: req.body.id },
    { completedDate: new Date(Date.now()).toUTCString() },
    { new: true }
  );
  return res.status(200).send(data);
});

module.exports = {
  addTask,
  getTasks,
  completeTask,
};
