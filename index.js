const path = require("path");
require("dotenv").config();

const mongoose = require("mongoose");

const skills = require("./routes/skill_routes");
const skillTypes = require("./routes/skill_type_routes");
const experience = require("./routes/experience_routes");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const users = require("./routes/user_routes");
const auth = require("./routes/auth_routes");

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json({ type: "application/json" }));
const { PORT, NODE_ENV } = process.env;
const isDev = NODE_ENV === "development";

if (isDev) {
  console.log("using cors");
  app.use(
    cors({
      origin: ["http://localhost:5173"],
      methods: ["POST", "PUT", "GET", "DELETE"],
      credentials: true,
    })
  );
}

const config = require("config");
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: private key is not defined.");
  process.exit(1);
}

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

const port = PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
