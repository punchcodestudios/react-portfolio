const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task");
const taskMiddleware = require("../middleware/task");

router.post("/add-task", taskController.addTask, taskMiddleware.addTask);
router.get("/get-tasks", taskController.getTasks, taskMiddleware.getTasks);
router.post(
  "/complete-task",
  taskController.completeTask,
  taskMiddleware.completeTask
);

module.exports = router;
