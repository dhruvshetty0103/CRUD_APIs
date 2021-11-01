const userModel = require('../models/user.model.js')
const bcrypt = require('bcrypt')
const mailHelper = require('../../utility/node.mailer.js')
const jwtHelper = require('../../utility/jwt.js')
class userService {
  /**
   * @description Service layer function for user login
   * @param {Object} body
   * @param {callback} callback
   */

  loginUser = (body, callback) => {
    userModel.loginUser(body, (err, data) => {
      if (err) {
        return callback(err, null)
      } else {
        if (bcrypt.compareSync(body.password, data.password)) {
          var token = jwtHelper.generateToken(data._id)
          var result = { data: data, Token: token }
          return callback(null, result)
        } else {
          return callback('password mismatch')
        }
      }
    })
  }

  createUser = (body, callback) => {
    userModel.createUser(
      body.firstName,
      body.lastName,
      body.email,
      body.password,
      (err, data) => {
        return err ? callback(err, null) : callback(null, data)
      }
    )
  }

  findAll = (callback) => {
    userModel.findAll((err, data) => {
      return err ? callback(err, null) : callback(null, data)
    })
  }

  findOne = (email, callback) => {
    userModel.findOne(email, (err, data) => {
      return err ? callback(err, null) : callback(null, data)
    })
  }

  updateUser = (findId, body, callback) => {
    userModel.updateUser(
      findId,
      body.firstName,
      body.lastName,
      body.email,
      body.password,
      (err, data) => {
        return err ? callback(err, null) : callback(null, data)
      }
    )
  }

  deleteOne = (findId, callback) => {
    userModel.deleteOne(findId, (err, data) => {
      return err ? callback(err, null) : callback(null, data)
    })
  }

  forgotPassword = (email) => {
    return userModel
      .forgotPassword(email)
      .then((data) => {
        return mailHelper
          .mailer(data.email, data.resetPasswordToken)
          .then((data) => {
            return data
          })
          .catch((err) => {
            throw err
          })
      })
      .catch((err) => {
        throw err
      })
  }

  resetPassword = (token, password) => {
    return userModel
      .resetPassword(token, password)
      .then((data) => {
        return data
      })
      .catch((err) => {
        throw err
      })
  }
}

module.exports = new userService()
