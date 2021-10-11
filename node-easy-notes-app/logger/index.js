const infoLogger=require('./logger');

let logger=null;
if (process.env.NODE_ENV !== 'production') {
    logger=infoLogger();
  }

  module.exports=logger;