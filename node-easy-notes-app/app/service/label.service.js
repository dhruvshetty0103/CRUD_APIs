/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js
 * @descrition      : get the values from the controller and process them for the labels in fundo labels
 * @file            : label.service.js
 * @author          : Dhruv Shetty
 * @version         : 1.0
 * @since           : 7-Oct-2021
 *
 **************************************************************************/

const labelModel = require("../models/label.model.js");

class LabelService {
  /**
   * @description Service layer function to create a label
   * @param {Object} body
   * @returns err or data
   */
  createlabel = async (body) => {
    try {
      const data = await labelModel.createlabel(body.title, body.userId);
      return data;
    } catch (error) {
      throw error;
    }
  };
  /**
   * @description Service layer function to find all label
   * @returns err or data
   */
  findAll = async (userId) => {
    try {
      const data = await labelModel.findAll(userId);
      return data;
    } catch (error) {
      throw error;
    }
  };
  /**
   * @description Service layer function to find a label
   * @param {string} labelId
   * @returns err or data
   */
  findOne = async (userId, labelId) => {
    try {
      const data = await labelModel.findOne(userId, labelId);
      return data;
    } catch (error) {
      throw error;
    }
  };
  /**
   * @description Service layer function to update a label
   * @param {string} labelId
   * @param {Object} body
   * @returns err or data
   */
  updatelabel = async (userId, labelId, body) => {
    try {
      const data = await labelModel.updatelabel(userId, labelId, body);
      return data;
    } catch (error) {
      throw error;
    }
  };
  /**
   * @description Service layer function to delete a label
   * @param {String} labelId
   * @returns err or data
   */
  deleteOne = async (userId, labelId) => {
    try {
      const data = await labelModel.deleteOne(userId, labelId);
      return data;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new LabelService();