const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    password: String 
}, {
    timestamps: true
});

const myUser = mongoose.model("User", UserSchema);

class userModel {
    //creates a user and saves it in database
    createUser = (name, password, callback) => {
      const user = new myUser({
        name: name,
        password: password,
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
    updateUser = (userId, name, password, callback) => {
      // Find user and update it with the request body
      myUser.findByIdAndUpdate(
        userId,
        {
            name: name || "Unnamed user",
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