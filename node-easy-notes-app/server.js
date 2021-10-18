const express = require('express');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const logger=require('./logger/logger.js');
const noteRouter = require('./app/routes/note.routes.js');
const userRouter = require('./app/routes/user.routes.js');
// create express app
const app = express();

app.use(express.urlencoded({
    extended: false
}))
app.use(express.json());

app.use('/notes',noteRouter);
app.use('/users',userRouter);

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// listen for requests
app.listen(3000, () => {
    logger.info("Server is listening on port 3000");
});