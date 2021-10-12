const express = require("express");
const validate = require("../middleware/user.middleware.js");
const userControl = require('../controllers/user.controller.js');
const route=express.Router();

/*
    Usage of middleware here for the title and content
    pattern validation and if successful then
    Create a new Note
*/ 
route.post('/create',validate, userControl.createNote);

// Retrieve all Notes
route.get('/getAllUser', userControl.findAll);

// Retrieve a single Note with noteId
route.get('/:userId', userControl.findOne);

// Update a Note with noteId
route.put('/:userId', userControl.updateNote);

// Delete a Note with noteId
route.delete('/:userId', userControl.deleteOne);

module.exports=route;