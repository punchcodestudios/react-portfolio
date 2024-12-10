const winston = require("winston");

module.exports = async function (err, req, res, next) {
  // console.log("MIDDLEWARE: ", req.body);
  const logger = winston.loggers.get("appLogger");
  logger.error(err, err.status, err.statusCode);
  return res
    .status(err.status)
    .json({ content: [], status: err.status, message: err.message });
};
