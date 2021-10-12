const { createLogger, format, transports } = require('winston');
const { combine, timestamp, prettyPrint, json } = format;
require("winston-daily-rotate-file");

var transport = new transports.DailyRotateFile({
  filename: "./logger/Log-%DATE%.log",
  datePattern: "DD-MM-YYYY",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
});

const logger=()=>createLogger({
        level: "info",
        format: combine(
            timestamp({format:"HH:mm:ss"}),
            json(),
            prettyPrint(),
            myFormat
            ),
        transports:[transports],
        });
module.exports=logger;