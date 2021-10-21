const jwtHelper = require("../../utility/jwt");
class userMiddleware {
  userValidation = (req, res, next) => {
    //first name validation
    let nameRegex = RegExp("^[A-Z][a-zA-Z]{2,}");
    if (!nameRegex.test(req.body.name)) {
      return res.status(400).send({
        message:
          "First Name should begin with caps and should be minimum of length 3",
      });
    }
    //email validation
    let emailRegex = RegExp(
      "^[a-zA-Z0-9-_+]+(\\.?[a-zA-Z0-9-_]+)@[a-zA-Z0-9-_]+\\.[a-zA-Z]{2,}(\\.?[a-zA-Z-_]+)$"
    );
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).send({
        message: "Enter a valid email ID",
      });
    }
    next();
  };

  ensureToken = (req, res, next) => {
    const bearerHeader = req.headers["authorization"] || req.headers.token;
    if (!bearerHeader) {
      res.send("Token is empty");
    }
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    jwtHelper.verifyToken(token, (err, data) => {
      if (err) {
        res.send(err);
      }
      next();
    });
  };
}

module.exports = new userMiddleware();