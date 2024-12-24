const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task");
const taskMiddleware = require("../middleware/task");
const responseController = require("../controllers/response");

router.post("/add-task", taskController.addTask, taskMiddleware.addTask);
router.get(
  "/get-tasks",
  taskController.getTasks,
  responseController.sendSuccessResponse
);
router.post(
  "/complete-task",
  taskController.completeTask,
  taskMiddleware.completeTask
);

module.exports = router;
