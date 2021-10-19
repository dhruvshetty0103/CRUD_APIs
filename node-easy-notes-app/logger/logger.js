const { createLogger, format, transports } = require("winston");
const { combine, timestamp, prettyPrint, json } = format;
require("winston-daily-rotate-file");

var transport = new transports.DailyRotateFile({
  filename: "./logger/Log-%DATE%.log",
  datePattern: "DD-MM-YYYY",
});

const logger = createLogger({
  level: "info",
  format: combine(
    json(),
    timestamp({ format: "DD-MM-YYYY, HH:mm:ss" }),
    prettyPrint()
  ),
  transports: [transport],
});

module.exports = logger