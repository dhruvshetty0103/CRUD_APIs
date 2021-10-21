const userModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwtHelper = require("../../utility/jwt.js");
class userService {

  /**
   * @description Service layer function for user login
   * @param {Object} body
   * @param {callback} callback
   */

   loginUser = (body, callback) => {
    userModel.loginUser(body, (err, data) => {
      if (err) {
        return callback(err, null);
      } else {
        if (bcrypt.compareSync(body.password, data.password)) {
          var token = jwtHelper.generateToken(body.email);
          var result = data + "Token:" + token;
          return callback(null, result);
        } else {
          return callback("password mismatch");
        }
      }
    });
  };

  createUser = (body,callback) => {
    userModel.createUser(body.name,body.email,body.phoneNumber, body.password,(err,data)=>{
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

  updateUser = (findId,body,callback) => {
    userModel.updateUser(findId,body.name,body.email,body.phoneNumber, body.password,(err,data) => {
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