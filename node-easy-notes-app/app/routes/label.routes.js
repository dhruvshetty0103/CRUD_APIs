/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js
 * @descrition      : label routes for label url end points
 * @file            : label.routes.js
 * @author          : Dhruv Shetty
 * @version         : 1.0
 * @since           : 7-Oct-2021
 *
 **************************************************************************/

const express = require("express");
const labelController = require("../controllers/label/label.controller");
const labelRoute = express.Router();
const labelMiddleware = require("../middleware/note.middleware.js");

// Create a new Label
labelRoute.post("/", labelMiddleware.ensureToken, labelController.createLabel);

// Retrieve all Labels
labelRoute.get("/", labelMiddleware.ensureToken, labelController.findAll);

// Retrieve a single Label with LabelId
labelRoute.get(
  "/:labelId",
  labelMiddleware.ensureToken,
  labelController.findOne
);

// Update a Label with LabelId
labelRoute.put(
  "/:labelId",
  labelMiddleware.ensureToken,
  labelController.updateLabel
);

// Delete a Label with LabelId
labelRoute.delete(
  "/:labelId",
  labelMiddleware.ensureToken,
  labelController.deleteOne
);

module.exports = labelRoute;