//https://www.codemzy.com/blog/react-axios-interceptor
const winston = require("winston");
require("dotenv").config();

process.on("unhandledRejection", (ex) => {
  throw `${ex.message} | exception: ${ex}`;
});

const express = require("express");
const app = express();

app.use(express.json({ type: "application/json" }));
const { PORT, NODE_ENV } = process.env;
const isDev = NODE_ENV === "development";

// Security
const cookieParser = require("cookie-parser");
app.use(cookieParser(process.env.COOKIE_SECRET));
const cors = require("cors");

if (isDev) {
  app.use(
    cors({
      origin: ["http://localhost:5173"],
      methods: ["POST", "PUT", "GET", "DELETE"],
      credentials: true,
    })
  );
}

require("./startup/logging");
const logger = winston.loggers.get("appLogger");
require("./startup/routes")(app);
require("./startup/db")(logger);

const config = require("config");
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: private key is not defined.");
  process.exit(1);
}

require("./startup/prod")(app);

// email
const path = require("path");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

if (!isDev) {
  this.app.use(express.static(path.join(__dirname, "./build")));
}
// General
const port = PORT || 3000;
app.listen(port, () => logger.info(`Listening on port ${port}...`));
