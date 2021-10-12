const userService = require("../service/user.service");

class userController {
  //creates a user in the database
  createUser = (req, res) => {
    let name = req.body.name || "Untitled User";
    let phoneNumber=req.body.phoneNumber;
    let email=req.body.email;
    let password = req.body.password;
    userService.createUser(title,phoneNumber,email, password, (err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User.",
        });
      }
      res.status(200).send(data);
    });
  };

  // Retrieve and return all Users from the database.
  findAll = (req, res) => {
    userService.findAll((err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User.",
        });
      }
      res.status(200).send(data);
    });
  };

  // Find a single User with a UserId
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
          message: "Error retrieving User with id " + id,
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

  // Update a User identified by the UserId in the request
  updateUser = (req, res) => {
    let id = req.params.userId;
    let name = req.body.name;
    let phoneNumber=req.body.phoneNumber;
    let email=req.body.email;
    let password = req.body.password;
    userService.updateUser(id,name, phoneNumber,email,password, (err, data) => {
      if (err) {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "User not found with id " + id,
          });
        }
        return res.status(500).send({
          message: "Error updating User with id " + id,
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

  // Delete a User with the specified UserId in the request
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
          message: "Error deleting User with id " + id,
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