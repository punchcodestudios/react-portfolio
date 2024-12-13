const winston = require("winston");

module.exports = async function (err, req, res, next) {
  const logger = winston.loggers.get("appLogger");
  logger.error(err, err.status, err.statusCode);
  return res.status(err.status).json({
    content: {
      target: [],
      meta: { total: 0, success: false },
      error: { status: err.status, message: err.message },
    },
  });
};
