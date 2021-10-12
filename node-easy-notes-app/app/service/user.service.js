const userModel = require("../models/user.model.js");

class userService {
  createUser = (name,phoneNumber,email,password,callback) => {
    userModel.createUser(name,phoneNumber,email,password,(err,data)=>{
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

  updateUser = (findId,name,phoneNumber,email,password,callback) => {
    userModel.updateUser(findId,name,phoneNumber,email,password,(err,data) => {
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