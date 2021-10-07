const express = require('express');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');


// create express app
const app = express();

app.use(express.urlencoded({
    extended: false
}))
app.use(express.json());

require('./app/routes/note.routes.js')(app);

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
    console.log("Server is listening on port 3000");
});



