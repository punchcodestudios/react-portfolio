const Joi = require("joi");
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 250,
  },
  addDate: {
    type: Date,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  completedDate: {
    type: Date,
    required: false,
  },
  taskGroupRefid: {
    type: String,
    required: true,
  },
});

const Task = mongoose.model("Task", taskSchema, "tasks");

function validateTask(task) {
  const schema = {
    name: Joi.string().max(50).required(),
    description: Joi.string().min(5).max(250).required(),
    dueDate: Joi.date().required(),
    taskGroupRefid: Joi.string().required(),
  };

  return Joi.validate(task, schema);
}

exports.Task = Task;
exports.validate = validateTask;
