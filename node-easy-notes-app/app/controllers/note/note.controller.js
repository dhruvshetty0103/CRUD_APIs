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
    noteService.findAll(req.body.userId,(err, data) => {
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
    noteService.findOne(req.body.userId, req.params.noteId, (err, data) => {
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
    let body = req.body;
    noteService.updateNote(req.body.userId,req.params.noteId, body, (err, data) => {
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
    noteService.deleteOne(req.body.userId,req.params.noteId, (err, data) => {
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