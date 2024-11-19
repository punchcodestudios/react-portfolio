const config = require("config");
const mongoose = require("mongoose");
const skills = require("./routes/skill_routes");
const skillTypes = require("./routes/skill_type_routes");
const experience = require("./routes/experience_routes");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const users = require("./routes/user_routes");
const auth = require("./routes/auth_routes");
const express = require("express");
const app = express();

console.log(config);
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: private key is not defined.");
  process.exit(1);
}

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

mongoose
  .connect("mongodb://localhost:27017/reactportfolio")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/skills", skills);
app.use("/api/skill-types", skillTypes);
app.use("/api/experience", experience);
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
