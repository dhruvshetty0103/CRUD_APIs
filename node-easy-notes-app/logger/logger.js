//const winston = require('winston');

const { createLogger,format, transports} = require('winston');
const { combine, timestamp, prettyPrint} = format;

const logger=createLogger({
        transports: [
          new transports.File({
            filename:'./logger/info.log',
            level: 'info',
            format: combine( 
            timestamp({format:"HH:mm:ss"}),
            format.json(),
            prettyPrint()
            ),
          })],
      });
module.exports=logger; 