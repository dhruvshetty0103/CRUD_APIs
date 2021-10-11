const express = require("express");
const validate = require("../middleware/note.middleware.js");
const userControl = require('../controllers/note.controller.js');
const route=express.Router();

/*
    Usage of middleware here for the title and content
    pattern validation and if successful then
    Create a new Note
*/ 
route.post('/create',validate, userControl.createNote);

// Retrieve all Notes
route.get('/getAllNotes', userControl.findAll);

// Retrieve a single Note with noteId
route.get('/:noteId', userControl.findOne);

// Update a Note with noteId
route.put('/:noteId', userControl.updateNote);

// Delete a Note with noteId
route.delete('/:noteId', userControl.deleteOne);

module.exports=route;