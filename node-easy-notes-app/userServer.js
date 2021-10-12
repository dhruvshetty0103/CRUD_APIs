const express = require('express');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const logger=require('./logger')
const router=require('./app/routes/user.routes.js');
// create express app
const app = express();

app.use(express.urlencoded({
    extended: false
}))
app.use(express.json());

app.use('/user',router);

mongoose.Promise = global.Promise;

// Connecting to the database
const dbConnect = () =>{
    mongoose.connect(dbConfig.url, {
        useNewUrlParser: true
    }).then(() => {
        logger.info("Successfully connected to the database");    
    }).catch(err => {
        logger.error('Could not connect to the database. Exiting now...', err);
        process.exit();
    });
}

//connecting to server
const server = app.listen(3000, () => {
    const host = server.address().address
    const port = server.address().port
    logger.info("Example app listening at http://%s:%s", host, port)
    dbConnect();
 })