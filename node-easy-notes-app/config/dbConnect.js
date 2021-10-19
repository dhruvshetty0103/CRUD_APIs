const mongoose = require('mongoose');
const dbConfig = require('./database.config.js');
const logger = require('../logger/logger.js');

// Connecting to the database
exports.dbConnection = () =>{
    mongoose.connect(dbConfig.url, {
        useNewUrlParser: true
    }).then(() => {
        logger.info("Successfully connected to the database");    
    }).catch(err => {
        logger.error('Could not connect to the database. Exiting now...', err);
        process.exit();
    });
}