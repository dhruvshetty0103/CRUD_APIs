const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = mongoose.Schema({
    name: String,
    email:String,
    phoneNumber:Number,
    password: String 
}, {
    timestamps: true
});

const myUser = mongoose.model("User", UserSchema);
let encryptedPassword;
class userModel {
  loginUser = (body, callback) => {
    return myUser.findOne({ email: body.email }, (err, data) => {
      return err
        ? callback(err, null)
        : data == null
        ? callback("Email id is not present", null)
        : callback(null, data);
    });
  };


    //creates a user and saves it in database
    createUser = (name,email,phoneNumber, password, callback) => {
      encryptedPassword = bcrypt.hashSync(password, 10);
      const user = new myUser({
        name: name,
        email:email,
        phoneNumber:phoneNumber,
        password: encryptedPassword,
      });
      // Save user in the database
      return user.save((err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    };
  
    // Retrieve and return all users from the database.
    findAll = (callback) => {
      return myUser.find((err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    };
  
    // Find a single user with a userId
    findOne = (userId, callback) => {
        myUser.findById(userId, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    };
    
  
    // Update a user identified by the userId in the request
    updateUser = (userId, name,email,phoneNumber, password, callback) => {
      // Find user and update it with the request body
      myUser.findByIdAndUpdate(
        userId,
        {
            name: name || "Unnamed user",
            email:email,
            phoneNumber:phoneNumber,
            password: password,
        },
        { new: true },
        (err, data) => {
          return err ? callback(err, null) : callback(null, data);
        }
      );
    };
  
    // Delete a user with the specified userId in the request
    deleteOne = (userId, callback) => {
        myUser.findByIdAndRemove(userId, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    };
  }
  
module.exports = new userModel();