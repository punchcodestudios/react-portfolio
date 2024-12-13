const express = require("express");
// const skills = require("../routes/skill_routes");
const skillTypes = require("../routes/skill_type_routes");
// const experience = require("../routes/experience_routes");
const genres = require("../routes/genres");
const customers = require("../routes/customers");
const users = require("../routes/user_routes");
const auth = require("../routes/auth_routes");
const sendMail = require("../routes/mail_routes");
const tasks = require("../routes/task_routes");
const resume = require("../routes/resume_routes");
const error = require("../middleware/catchError");

module.exports = function (app) {
  // API middleware
  app.use(express.json());
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  // app.use("/api/skills", skills);
  app.use("/api/skill-types", skillTypes);
  // app.use("/api/experience", experience);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/mail", sendMail);
  app.use("/api/tasks", tasks);
  app.use("/api/resume", resume);
  // global error handling
  app.use(error);
};
