const userModel = require("../models/note.model.js");

class userService {
  createNote = (title, content,callback) => {
    userModel.createNote(title, content,(err,data)=>{
        return err ? callback(err, null) : callback(null, data);
    })
      
  };

  findAll = (callback) => {
    userModel.findAll((err,data) => {
        return err ? callback(err, null) : callback(null, data);
    })    
  };

  findOne = (findId, callback) => {
    userModel.findOne(findId, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  updateNote = (findId, title, content,callback) => {
    userModel.updateNote(findId,title,content,(err,data) => {
        return err ? callback(err, null) : callback(null, data);
      }
    );
  };

  deleteOne = (findId,callback) => {
    userModel.deleteOne(findId,(err,data) => {
        return err ? callback(err, null) : callback(null, data);
    });
  };
}

module.exports = new userService();