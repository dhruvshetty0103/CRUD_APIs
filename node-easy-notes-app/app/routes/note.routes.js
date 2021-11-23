const noteMiddleware = require("../middleware/note.middleware.js");
const express = require("express");
const noteController = require("../controllers/note/note.controller.js");
const noteRoute = express.Router();
const cors=require('cors')

// Create a new Note
noteRoute.post("/",cors(),noteMiddleware.ensureToken,noteMiddleware.validate,noteController.createNote);

// Retrieve all Notes
noteRoute.get("/",cors(),noteMiddleware.ensureToken, noteController.findAll);

// Retrieve a single Note with noteId
noteRoute.get("/:noteId",cors(),noteMiddleware.ensureToken, noteController.findOne);

// Update a Note with noteId
noteRoute.put("/:noteId",cors(),noteMiddleware.ensureToken, noteController.updateNote);

// Delete a Note with noteId
noteRoute.delete("/:noteId",cors(),noteMiddleware.ensureToken, noteController.deleteOne);

module.exports = noteRoute;