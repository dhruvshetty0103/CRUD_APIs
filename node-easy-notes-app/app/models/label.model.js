/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js
 * @descrition      : label model creates label schema and performs db operation
 * @file            : label.model.js
 * @author          : Dhruv Shetty
 * @version         : 1.0
 * @since           : 7-Oct-2021
 *
 **************************************************************************/

const mongoose = require("mongoose");
const LabelSchema = mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const myLabel = mongoose.model("Label", LabelSchema);

class LabelModel {
  /**
   * @description creates a label and saves it in database
   * @param {string} title
   * @returns err or data
   */
  createlabel = async (title, userId) => {
    const label = new myLabel({
      title: title,
      userId: userId,
    });
    try {
      const data = await label.save();
      return data;
    } catch (error) {
      throw error;
    }
  };

  /**
   * @description finds all labels present in data base
   * @returns err or data
   */
  findAll = async (userId) => {
    try {
      const data = await myLabel
        .find({ userId: userId })
        .populate({
          path: "userId",
          select: ["firstName", "lastName", "age", "email"],
        })
        .exec();
      return data;
    } catch (error) {
      throw error;
    }
  };

  /**
   * @description finds one label which matches the given labelid
   * @param {Object} labelId
   * @returns err or data
   */
  findOne = async (userId, labelId) => {
    try {
      const data = await myLabel.findOne({ userId: userId, _id: labelId });
      if (!data) {
        throw "You dont have access to this label";
      } else {
        return data;
      }
    } catch (error) {
      throw error;
    }
  };

  /**
   * @description Find label and update it with the request body
   * @param {Object} labelId
   * @returns err or data
   */
  updatelabel = async (userId, labelId, body) => {
    try {
      const data = await myLabel.findOneAndUpdate(
        { userId: userId, _id: labelId },
        {
          title: body.title,
        },
        { new: true }
      );
      if (!data) {
        throw "You dont have access to this label";
      } else {
        return data;
      }
    } catch (error) {
      throw error;
    }
  };

  /**
   * @description finds a label and deletes it
   * @param {Object} labelId
   * @returns err or data
   */
  deleteOne = async (userId, labelId) => {
    try {
      const data = await myLabel.findOneAndRemove({
        userId: userId,
        _id: labelId,
      });
      if (!data) {
        throw "You dont have access to this label";
      } else {
        return data;
      }
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new LabelModel();