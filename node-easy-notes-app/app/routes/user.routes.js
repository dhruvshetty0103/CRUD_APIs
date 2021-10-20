const validate = require("../middleware/user.middleware.js");
const express = require("express");
const userController = require("../controllers/user/user.controller.js");
const userRoute = express.Router();


// Create a new Note
userRoute.post("/", validate, userController.createUser);

// Retrieve all Notes
userRoute.get("/", userController.findAll);

// Retrieve a single Note with noteId
userRoute.get("/:userId", userController.findOne);

// Update a Note with noteId
userRoute.put("/:userId", userController.updateUser);

// Delete a Note with noteId
userRoute.delete("/:userId", userController.deleteOne);

module.exports = userRoute;