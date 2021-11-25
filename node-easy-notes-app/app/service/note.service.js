const noteModel = require("../models/note.model.js");

class noteService {
  createNote = (body,callback) => {
    noteModel.createNote(body.title, body.content, body.userId,(err,data)=>{
        return err ? callback(err, null) : callback(null, data);
    })
      
  };

  findAll = (userId,callback) => {
    noteModel.findAll(userId,(err,data) => {
        return err ? callback(err, null) : callback(null, data);
    })    
  };

  findOne = (userId,noteId, callback) => {
    noteModel.findOne(userId, noteId,(err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  updateNote = (userId,noteId, body,callback) => {
    noteModel.updateNote(userId,noteId,body,(err,data) => {
        return err ? callback(err, null) : callback(null, data);
      }
    );
  };

  deleteOne = (userId,noteId,callback) => {
    noteModel.deleteOne(userId,noteId,(err,data) => {
        return err ? callback(err, null) : callback(null, data);
    });
  };
}

module.exports = new noteService();