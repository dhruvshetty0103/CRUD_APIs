const express = require('express');
const mongoose = require('mongoose');
const logger=require('./logger/logger.js');
const noteRouter = require('./app/routes/note.routes.js');
const userRouter = require('./app/routes/user.routes.js');
const db = require('./config/dbConnect.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors=require('cors')


// create express app
const app = express();

app.use(express.urlencoded({
    extended: false
}))
app.use(express.json());

app.use('/notes',cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}),noteRouter);
app.use('/users',cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}),userRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose.Promise = global.Promise;

// Connecting to the database
// listen for requests
const server=app.listen(4000, () => {
    logger.info("Server is listening on port 4000");
    db.dbConnection();
});