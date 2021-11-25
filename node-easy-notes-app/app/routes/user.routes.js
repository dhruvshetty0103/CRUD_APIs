const express = require('express')
const userController = require('../controllers/user/user.controller.js')
const userRoute = express.Router()
const userMiddleware = require('../middleware/user.middleware')
const { body } = require('express-validator')
//User login
userRoute.post('/login', userController.loginUser)

// Create a new User
userRoute.post(
  '/',
  body('firstName')
    .matches('^[A-Z][a-zA-Z]{2,}')
    .withMessage(
      'First Name should begin with caps and should be minimum of length 3'
    ),
  body('lastName')
    .matches('^[A-Z][a-zA-Z]{2,}')
    .withMessage(
      'First Name should begin with caps and should be minimum of length 3'
    ),
  body('email').isEmail().withMessage('Enter a valid Email'),
  body('password'),
  userController.createUser
)

// Retrieve all Notes
userRoute.get('/', userController.findAll)

// Retrieve a single Note with noteId
userRoute.get('/:userId', userController.findOne)

// Update a Note with noteId
userRoute.put(
  '/:userId',
  body('firstName')
    .matches('^[A-Z][a-zA-Z]{2,}')
    .withMessage(
      'First Name should begin with caps and should be minimum of length 3'
    ),
  body('lastName')
    .matches('^[A-Z][a-zA-Z]{2,}')
    .withMessage(
      'First Name should begin with caps and should be minimum of length 3'
    ),
  body('email').isEmail().withMessage('Enter a valid Email'),
  body('password'),
  userController.updateUser
)

// Delete a Note with noteId
userRoute.delete('/:userId', userController.deleteOne)

//forgot password route
userRoute.post('/forgot', userController.forgotPassword)

//email password reset route
userRoute.post('/reset/:token', userController.resetPassword)

module.exports = userRoute
