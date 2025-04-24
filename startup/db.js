const mongoose = require("mongoose");

module.exports = function (logger) {
  console.log("DB CONNECTION: ", process.env.MONGO_DB_CONNECTION_PRODUCTION);
  mongoose
    .connect(process.env.MONGO_DB_CONNECTION_PRODUCTION)
    .then(() => logger.info("Connected to MongoDB_Production..."));
};
