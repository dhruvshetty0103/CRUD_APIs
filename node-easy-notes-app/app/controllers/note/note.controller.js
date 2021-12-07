const noteService = require("../../service/note.service.js");
const dtoObject=require("../note/note.responseSchema.js");
const logger = require("../../../logger/logger.js");
const multer = require("../../../utility/multer");

let responseObject;

class noteController {
  //creates a note in the database
  createNote = (req, res) => {
    let body = req.body;
    noteService.createNote(body, (err, data) => {
      if (err) {
        responseObject = dtoObject.noteApiFailure;
        responseObject.message = err.message;
        return res.send(responseObject);
      }
      responseObject = dtoObject.noteApiSuccess;
      responseObject.message = data;
      return res.send(responseObject);
    });
  };

  // Retrieve and return all notes from the database.
  findAll = (req, res) => {
    noteService.findAll(req.body.userId,(err, data) => {
      if (err) {
        responseObject = dtoObject.noteApiFailure;
        responseObject.message = err.message;
        return res.send(responseObject);
      }
      responseObject = dtoObject.noteApiSuccess;
      responseObject.message = data;
      return res.send(responseObject);
    });
  };

  // Find a single note with a noteId
  findOne = (req, res) => {
    noteService.findOne(req.body.userId, req.params.noteId, (err, data) => {
      if (err) {
        console.log(err);
        if (err.kind === "ObjectId") {
          responseObject = dtoObject.noteApiFindFailure;
          responseObject.message = err.message;
          return res.send(responseObject);
        }
        responseObject = dtoObject.noteApiFailure;
        responseObject.message = err.message;
        return res.send(responseObject);
      }
      if (!data) {
        responseObject = dtoObject.noteApiFindFailure;
        return res.send(responseObject);
      }
      responseObject = dtoObject.noteApiSuccess;
      responseObject.message = data;
      return res.send(responseObject);
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
          return res.send(responseObject);
        }
        responseObject = dtoObject.noteApiFailure;
        responseObject.message = err.message;
        return res.send(responseObject);
      }
      if (!data) {
        responseObject = dtoObject.noteApiFindFailure;
        return res.send(responseObject);
      }
      responseObject = dtoObject.noteApiSuccess;
      responseObject.message = data;
      return res.send(responseObject);
    });
  };

  // Delete a note with the specified noteId in the request
  deleteOne = (req, res) => {
    noteService.deleteOne(req.body.userId,req.params.noteId, (err, data) => {
      if (err) {
        if (err.kind === "ObjectId") {
          responseObject = dtoObject.noteApiFindFailure;
          responseObject.message = err.message;
          return res.send(responseObject);
        }
        responseObject = dtoObject.noteApiFailure;
        responseObject.message = err.message;
        return res.send(responseObject);
      }
      if (!data) {
        responseObject = dtoObject.noteApiFindFailure;
        return res.send(responseObject);
      }
      responseObject = dtoObject.noteApiSuccess;
      responseObject.message = "deleted successfully";
      return res.send(responseObject);
    });
  };

  /**
   * @description Handles the request and response for posting a image
   * @param {Object} req
   * @param {Object} res
   */
uploadImage = (req, res) => {
  const upload = multer();
  upload(req, res, (err) => {
    if (err) {
      logger.error("Could not upload image", err);
      return res.status(400).send(err);
    } else {
      logger.info(res);
      return res.status(200).send(req.file);
    }
  });
}
}

module.exports = new noteController();