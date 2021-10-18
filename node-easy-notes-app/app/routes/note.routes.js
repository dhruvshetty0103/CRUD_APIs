const validate = require("../middleware/note.middleware.js");
const express = require("express");
const noteController = require("../controllers/note.controller.js");
const noteRoute = express.Router();


// Create a new Note
noteRoute.post("/",validate,noteController.createNote);

// Retrieve all Notes
noteRoute.get("/", noteController.findAll);

// Retrieve a single Note with noteId
noteRoute.get("/:noteId", noteController.findOne);

// Update a Note with noteId
noteRoute.put("/:noteId", noteController.updateNote);

// Delete a Note with noteId
noteRoute.delete("/:noteId", noteController.deleteOne);

module.exports = noteRoute;