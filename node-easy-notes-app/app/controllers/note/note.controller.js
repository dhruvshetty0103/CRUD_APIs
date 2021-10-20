const noteService = require("../../service/note.service.js");
const dtoObject=require("../note/note.responseSchema.js");

let responseObject;

class noteController {
  //creates a note in the database
  createNote = (req, res) => {
    let body = req.body;
    noteService.createNote(body, (err, data) => {
      if (err) {
        responseObject = dtoObject.noteApiFailure;
        responseObject.message = err.message;
        res.send(responseObject);
      }
      responseObject = dtoObject.noteApiSuccess;
      responseObject.message = data;
      res.send(responseObject);
    });
  };

  // Retrieve and return all notes from the database.
  findAll = (req, res) => {
    noteService.findAll((err, data) => {
      if (err) {
        responseObject = dtoObject.noteApiFailure;
        responseObject.message = err.message;
        res.send(responseObject);
      }
      responseObject = dtoObject.noteApiSuccess;
      responseObject.message = data;
      res.send(responseObject);
    });
  };

  // Find a single note with a noteId
  findOne = (req, res) => {
    let id = req.params.noteId;
    noteService.findOne(id, (err, data) => {
      console.log("result: " + data);
      if (err) {
        console.log(err);
        if (err.kind === "ObjectId") {
          responseObject = dtoObject.noteApiFindFailure;
          responseObject.message = err.message;
          res.send(responseObject);
        }
        responseObject = dtoObject.noteApiFailure;
        responseObject.message = err.message;
        res.send(responseObject);
      }
      if (!data) {
        responseObject = dtoObject.noteApiFindFailure;
        res.send(responseObject);
      }
      responseObject = dtoObject.noteApiSuccess;
      responseObject.message = data;
      res.send(responseObject);
    });
  };

  // Update a note identified by the noteId in the request
  updateNote = (req, res) => {
    let id = req.params.noteId;
    let body = req.body;
    noteService.updateNote(id, body, (err, data) => {
      if (err) {
        if (err.kind === "ObjectId") {
          responseObject = dtoObject.noteApiFindFailure;
          responseObject.message = err.message;
          res.send(responseObject);
        }
        responseObject = dtoObject.noteApiFailure;
        responseObject.message = err.message;
        res.send(responseObject);
      }
      if (!data) {
        responseObject = dtoObject.noteApiFindFailure;
        res.send(responseObject);
      }
      responseObject = dtoObject.noteApiSuccess;
      responseObject.message = data;
      res.send(responseObject);
    });
  };

  // Delete a note with the specified noteId in the request
  deleteOne = (req, res) => {
    let id = req.params.noteId;
    noteService.deleteOne(id, (err, data) => {
      if (err) {
        if (err.kind === "ObjectId") {
          responseObject = dtoObject.noteApiFindFailure;
          responseObject.message = err.message;
          res.send(responseObject);
        }
        responseObject = dtoObject.noteApiFailure;
        responseObject.message = err.message;
        res.send(responseObject);
      }
      if (!data) {
        responseObject = dtoObject.noteApiFindFailure;
        res.send(responseObject);
      }
      responseObject = dtoObject.noteApiSuccess;
      responseObject.message = "deleted successfully";
      res.send(responseObject);
    });
  };
}

module.exports = new noteController();