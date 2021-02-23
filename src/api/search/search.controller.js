/**
 * Using Rails-like standard naming convention for endpoints.
 * @author: Felipe Garcia <arfgarciama@unal.edu.co>
 */

const { HTTP_STATUS, ERROR_CODES } = require("../constants")
const { handleSuccess, handleError } = require("../utils/response")

const User = require("../user/user.model")
const { FORBIDDEN_FIELDS } = require("../user/constants")

/**
 * Get list of users
 */
const search = async (req, res) => {
  try {
    const users = await User.find({}, FORBIDDEN_FIELDS).exec()
    return handleSuccess(res, users)
  } catch (error) {
    return handleError(res, error)
  }
}

module.exports = {
  search,
}
