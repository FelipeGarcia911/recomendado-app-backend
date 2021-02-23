/**
 * Using Rails-like standard naming convention for endpoints.
 * @author: Felipe Garcia <arfgarciama@unal.edu.co>
 */

const { handleSuccess, handleError } = require("../utils/response")

const User = require("../user/user.model")
const { FORBIDDEN_FIELDS } = require("../user/constants")

/**
 * Get list of users
 */
const search = async (req, res) => {
  try {
    const { limit = 10, page = 1, ...query } = req.body
    const options = { limit, page, projection: FORBIDDEN_FIELDS }

    const result = await User.paginate(query, options)

    return handleSuccess(res, result)
  } catch (error) {
    return handleError(res, error)
  }
}

module.exports = {
  search,
}
