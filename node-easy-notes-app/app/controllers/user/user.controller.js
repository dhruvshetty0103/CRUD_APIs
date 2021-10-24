const userService = require("../../service/user.service.js");
const dtoObject=require("../user/user.responseSchema.js");
const logger = require("../../../logger/logger.js"); 
let responseObject;

class userController {

  /**
   * @description Handles request and response for user login
   * @param {Object} req
   * @param {Object} res
   */
  
  loginUser = (req, res) => {
    let body = req.body;
    userService.loginUser(body, (err, data) => {
      if (err) {
        logger.error(err);
        responseObject = dtoObject.userApiFailure;
        responseObject.message = err;
        return res.send(responseObject);
      }
      logger.info("login Successful");
      responseObject = dtoObject.userApiSuccess;
      responseObject.message = data;
      res.send(responseObject);
    });
  };

  //creates a user in the database
  createUser = (req, res) => {
    let body = req.body;
    userService.createUser(body, (err, data) => {
      if (err) {
        responseObject = dtoObject.userApiFailure;
        responseObject.message = err.message;
        res.send(responseObject);
      }
      responseObject = dtoObject.userApiSuccess;
      responseObject.message = data;
      res.send(responseObject);
    });
  };

  // Retrieve and return all users from the database.
  findAll = (req, res) => {
    userService.findAll((err, data) => {
      if (err) {
        responseObject = dtoObject.userApiFailure;
        responseObject.message = err.message;
        res.send(responseObject);
      }
      responseObject = dtoObject.userApiSuccess;
      responseObject.message = data;
      res.send(responseObject);
    });
  };

  // Find a single user with a userId
  findOne = (req, res) => {
    let id = req.params.userId;
    userService.findOne(id, (err, data) => {
      console.log("result: " + data);
      if (err) {
        if (err.kind === "ObjectId") {
          responseObject = dtoObject.userApiFindFailure;
          responseObject.message = err.message;
          res.send(responseObject);
        }
        responseObject = dtoObject.userApiFailure;
        responseObject.message = err.message;
        res.send(responseObject);
      }
      if (!data) {
        responseObject = dtoObject.userApiFindFailure;
        res.send(responseObject);
      }
      responseObject = dtoObject.userApiSuccess;
      responseObject.message = data;
      res.send(responseObject);
    });
  };

  // Update a user identified by the userId in the request
  updateUser = (req, res) => {
    let id = req.params.userId;
    let body=req.body;
    userService.updateUser(id, body, (err, data) => {
      if (err) {
        if (err.kind === "ObjectId") {
          responseObject = dtoObject.userApiFindFailure;
          responseObject.message = err.message;
          res.send(responseObject);
        }
        responseObject = dtoObject.userApiFailure;
        responseObject.message = err.message;
        res.send(responseObject);
      }
      if (!data) {
        responseObject = dtoObject.userApiFindFailure;
        res.send(responseObject);
      }
      responseObject = dtoObject.userApiSuccess;
      responseObject.message = data;
      res.send(responseObject);
    });
  };

  // Delete a user with the specified userId in the request
  deleteOne = (req, res) => {
    let id = req.params.userId;
    userService.deleteOne(id, (err, data) => {
      if (err) {
        logger.error(err);
        if (err.kind === "ObjectId") {
          responseObject = dtoObject.userApiFindFailure;
          responseObject.message = err.message;
          res.send(responseObject);
        }
        responseObject = dtoObject.userApiFailure;
        responseObject.message = err.message;
        res.send(responseObject);
      }
      if (!data) {
        responseObject = dtoObject.userApiFindFailure;
        res.send(responseObject);
      }
      logger.info("delete succesfully");
      responseObject = dtoObject.userApiSuccess;
      responseObject.message = "deleted successfully";
      res.send(responseObject);
    });
  };


  // Handles request for forgot the password

  forgotPassword = (req, res) => {
    let email = req.body.email;
    userService
      .forgotPassword(email)
      .then((data) => {
        res.send("Result:" + data);
      })
      .catch((err) => {
        res.send(err);
      });
  };
  
  // Handles request and response for resetting the password
   
  resetPassword = (req, res) => {
    let token = req.params.token;
    let password = req.body.password
    userService
      .resetPassword(token,password)
      .then((data) => {
        res.json({message:"Password updated successfully","Result:" :data});
      })
      .catch((err) => {
        console.log("error:" + err);
        res.send(err);
      });
  }
}
module.exports = new userController();