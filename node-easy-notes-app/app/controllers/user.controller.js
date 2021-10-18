const userService = require("../service/user.service.js");

class userController {
  //creates a user in the database
  createUser = (req, res) => {
    let name = req.body.name|| "Untitled Name";
    let password = req.body.password;
    userService.createUser(name, password, (err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the user.",
        });
      }
      res.status(200).send(data);
    });
  };

  // Retrieve and return all users from the database.
  findAll = (req, res) => {
    userService.findAll((err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the user.",
        });
      }
      res.status(200).send(data);
    });
  };

  // Find a single user with a userId
  findOne = (req, res) => {
    let id = req.params.userId;
    userService.findOne(id, (err, data) => {
      if (err) {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "User not found with id " + id,
          });
        }
        return res.status(500).send({
          message: "Error retrieving user with id " + id,
        });
      }
      if (!data) {
        return res.status(404).send({
          message: "User not found with id (in then) " + id,
        });
      }
      res.status(200).send({ User: data });
    });
  };

  // Update a user identified by the userId in the request
  updateUser = (req, res) => {
    let id = req.params.userId;
    let name = req.body.name;
    let password = req.body.password;
    userService.updateUser(id, name, password, (err, data) => {
      if (err) {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "User not found with id " + id,
          });
        }
        return res.status(500).send({
          message: "Error updating user with id " + id,
        });
      }
      if (!data) {
        return res.status(404).send({
          message: "User not found with id " + id,
        });
      }
      res.send({ message:"Update Succesfull",User: data });
    });
  };

  // Delete a user with the specified userId in the request
  deleteOne = (req, res) => {
    let id = req.params.userId;
    userService.deleteOne(id, (err, data) => {
      if (err) {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "User not found with id " + id,
          });
        }
        return res.status(500).send({
          message: "Error deleting user with id " + id,
        });
      }
      if (!data) {
        return res.status(404).send({
          message: "User not found with id " + id,
        });
      }
      res.send("Deleted node successfully");
    });
  };
}

module.exports = new userController();