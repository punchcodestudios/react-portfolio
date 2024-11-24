const winston = require("winston");

module.exports = function (err, req, res, next) {
  winston.error(err.message);
  res.status(500).json({ status: 500, message: "Error message" });
};
