//const winston = require('winston');

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, prettyPrint, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
    return {key:`${timestamp} [${level}]  ${message}`};
    
  });

const logger=()=>{
    return createLogger({
        level: 'info',
        format: combine(
            format.colorize(), 
            timestamp({format:"HH:mm:ss"}),
            format.json(),
            prettyPrint(),
            myFormat
            ),
        //defaultMeta: { service: 'user-service' },
        transports: [
          new transports.File({
            filename:'info.log'
          })],
      });
}
module.exports=logger;