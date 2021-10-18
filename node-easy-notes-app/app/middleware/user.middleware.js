module.exports = (req, res, next) => {
    //check if content is present
    if (!req.body.name) {
      return res.status(400).send({
        message: "Note content can not be empty",
      });
    }
    //validate title name
    var pattern = new RegExp("^[a-zA-Z][a-zA-Z0-9]{2,}$");
    if (!pattern.test(req.body.name)) {
      return res.status(400).send({
        message: "Name should begin with alphabets minimum of length 3",
      });
    } else {
      next();
    }
  };