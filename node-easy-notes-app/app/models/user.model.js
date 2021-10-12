const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    phoneNumber: Number,
    email : String,
    password : String 
}, {
    timestamps: true
});

const myUser = mongoose.model("User", UserSchema);

class userModel {
  //creates a User and saves it in database
  createUser = (name, phoneNumber, email, password, callback) => {
    const user = new myUser({
        name: name || "Unnamed User",
        phoneNumber :phoneNumber,
        email: email,
        password: password,
    });
    // Save User in the database
    return user.save((err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  // Retrieve and return all Users from the database.
  findAll = (callback) => {
    return myUser.find((err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  // Find a single User with a UserId
  findOne = (userId, callback) => {
    myUser.findById(userId, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  // Update a User identified by the UserId in the request
  updateUser = (userId, name,phoneNumber, email, password, callback) => {
    // Find User and update it with the request body
    myUser.findByIdAndUpdate(
        userId,
      {
        name: name || "Unnamed User",
        phoneNumber:phoneNumber, 
        email:email,
        password: password,
      },
      { new: true },
      (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      }
    );
  };

  // Delete a User with the specified UserId in the request
  deleteOne = (userId, callback) => {
    myUser.findByIdAndRemove(userId, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };
}

module.exports = new userModel();