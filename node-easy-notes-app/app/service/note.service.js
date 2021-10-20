const noteModel = require("../models/note.model.js");

class noteService {
  createNote = (body,callback) => {
    noteModel.createNote(body.title, body.content,(err,data)=>{
        return err ? callback(err, null) : callback(null, data);
    })
      
  };

  findAll = (callback) => {
    noteModel.findAll((err,data) => {
        return err ? callback(err, null) : callback(null, data);
    })    
  };

  findOne = (findId, callback) => {
    noteModel.findOne(findId, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  updateNote = (findId, body,callback) => {
    noteModel.updateNote(findId,body.title,body.content,(err,data) => {
        return err ? callback(err, null) : callback(null, data);
      }
    );
  };

  deleteOne = (findId,callback) => {
    noteModel.deleteOne(findId,(err,data) => {
        return err ? callback(err, null) : callback(null, data);
    });
  };
}

module.exports = new noteService();