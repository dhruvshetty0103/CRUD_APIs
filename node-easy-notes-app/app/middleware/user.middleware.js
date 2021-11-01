const jwtHelper = require('../../utility/jwt')
class userMiddleware {
  userValidation = (req, res, next) => {
    //first name validation
    let nameRegex = RegExp('^[A-Z][a-zA-Z]{2,}')
    if (!nameRegex.test(req.body.firstName)) {
      return res.status(400).send({
        message:
          'First Name should begin with caps and should be minimum of length 3',
      })
    }

    //last name validation
    if (!nameRegex.test(req.body.lastName)) {
      return res.status(400).send({
        message:
          'First Name should begin with caps and should be minimum of length 3',
      })
    }
    //email validation
    let emailRegex = RegExp(
      '^[a-zA-Z0-9-_+]+(\\.?[a-zA-Z0-9-_]+)@[a-zA-Z0-9-_]+\\.[a-zA-Z]{2,}(\\.?[a-zA-Z-_]+)$'
    )
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).send({
        message: 'Enter a valid email ID',
      })
    }
    next()
  }
}

module.exports = new userMiddleware()
