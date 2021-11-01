const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwtHelper = require('../../utility/jwt')
const UserSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    timestamps: true,
  }
)

const myUser = mongoose.model('User', UserSchema)
let encryptedPassword
class userModel {
  loginUser = (body, callback) => {
    return myUser.findOne({ email: body.email }, (err, data) => {
      return err
        ? callback(err, null)
        : data == null
        ? callback('Email id is not present', null)
        : callback(null, data)
    })
  }

  //creates a user and saves it in database
  createUser = (firstName, lastName, email, password, callback) => {
    encryptedPassword = bcrypt.hashSync(password, 10)
    const user = new myUser({
      firstName: firstName,
      lastName,
      lastName,
      email: email,
      password: encryptedPassword,
    })
    // Save user in the database
    return user.save((err, data) => {
      return err ? callback(err, null) : callback(null, data)
    })
  }

  // Retrieve and return all users from the database.
  findAll = (callback) => {
    return myUser.find((err, data) => {
      return err ? callback(err, null) : callback(null, data)
    })
  }

  // Find a single user with a userId
  findOne = (userId, callback) => {
    myUser.findById(userId, (err, data) => {
      return err ? callback(err, null) : callback(null, data)
    })
  }

  // Update a user identified by the userId in the request
  updateUser = (userId, firstName, lastName, email, password, callback) => {
    // Find user and update it with the request body
    myUser.findByIdAndUpdate(
      userId,
      {
        firstName: firstName || 'Unnamed user',
        lastName: lastName,
        email: email,
        password: password,
      },
      { new: true },
      (err, data) => {
        return err ? callback(err, null) : callback(null, data)
      }
    )
  }

  // Delete a user with the specified userId in the request
  deleteOne = (userId, callback) => {
    myUser.findByIdAndRemove(userId, (err, data) => {
      return err ? callback(err, null) : callback(null, data)
    })
  }

  // Forgot password with the specified userId in the request
  forgotPassword = (email) => {
    return myUser
      .findOne({ email: email })
      .then((data) => {
        if (!data) {
          throw 'Email not found'
        } else {
          let randomToken = jwtHelper.generateRandomCode()
          data.resetPasswordToken = randomToken
          data.resetPasswordExpires = Date.now() + 3600000
          return data
            .save()
            .then((res) => {
              return res
            })
            .catch((err) => {
              throw err
            })
        }
      })
      .catch((err) => {
        throw err
      })
  }

  //Model function for user password reset
  resetPassword = (token, newPassword) => {
    return myUser
      .findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      })
      .then((data) => {
        if (!data) {
          throw 'token not found'
        } else {
          encryptedPassword = bcrypt.hashSync(newPassword, 10)
          ;(data.password = encryptedPassword),
            (data.resetPasswordToken = undefined),
            (data.resetPasswordExpires = undefined)
          return data
            .save()
            .then((data) => {
              return data
            })
            .catch((err) => {
              throw err
            })
        }
      })
      .catch((err) => {
        throw err
      })
  }
}

module.exports = new userModel()
