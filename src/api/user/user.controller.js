/**
 * Using Rails-like standard naming convention for endpoints.
 * @author: Felipe Garcia <arfgarciama@unal.edu.co>
 */

const { HTTP_STATUS, ERROR_CODES } = require('../constants');
const { handleSuccess, handleError } = require('../utils/response');

const User = require('./user.model');

const RESTRICTED_FIELDS = ['password', '__v'];
const FORBIDDEN_FIELDS = `-${RESTRICTED_FIELDS.join(' -')}`;

function validationError(res, statusCode) {
  const statusCodeLocal = statusCode || 422;
  return (err) => res.status(statusCodeLocal).json(err);
}

/**
 * Get list of users
 */
const index = async (req, res) => {
  try {
    const users = await User.find({}, FORBIDDEN_FIELDS).exec();
    return handleSuccess(res, users);
  } catch (error) {
    return handleError(res, error);
  }
};

/**
 * Creates a new user
 */
const create = async (req, res) => {
  const {
    name, email, password, profile = {},
  } = req.body;

  try {
    const newUser = new User({
      name, email, password, profile,
    });
    newUser.password = await newUser.encryptPassword(password);
    const savedUser = await newUser.save();

    return handleSuccess(res, savedUser.details, HTTP_STATUS.CREATED);
  } catch (error) {
    return handleError(res, error);
  }
};

/**
 * Update a user
 */
const update = async (req, res) => {
  const newUserInfo = req.body;

  const { _id: tokenUserId } = req.user;
  const { id: paramsUserId } = req.params;

  if (tokenUserId != paramsUserId) {
    return handleError(res, null, HTTP_STATUS.ERROR, 'Invalid user, please check your credential');
  }

  try {
    const query = { _id: paramsUserId };
    const options = { new: true };
    const user = await User.findOneAndUpdate(query, newUserInfo, options).exec();

    return handleSuccess(res, user.details, HTTP_STATUS.OK);
  } catch (error) {
    return handleError(res, error);
  }
};

/**
 * Get a single user
 */
const show = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id, FORBIDDEN_FIELDS).exec();
    if (user) return handleSuccess(res, user.details);

    return handleError(res, null, HTTP_STATUS.NOT_FOUND, ERROR_CODES.USER_NOT_FOUND);
  } catch (error) {
    return handleError(res, error);
  }
};

/**
 * Deletes a user
 */
const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndRemove(id).exec();
    return handleSuccess(res, { id });
  } catch (error) {
    return handleError(res, error);
  }
};

/**
 * Change a users password
 */
const changePassword = async (req, res) => {
  const userId = req.user._id;
  const oldPass = String(req.body.oldPassword);
  const newPass = String(req.body.newPassword);

  const user = await User.findById(userId).exec();
  if (user.authenticate(oldPass)) {
    const userChange = user;
    userChange.password = newPass;
    return userChange.save()
      .then(() => {
        res.status(204).end();
      })
      .catch(validationError(res));
  }
  return res.status(403).end();
};

/**
 * Get my info
 */
const me = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findById({ _id }, FORBIDDEN_FIELDS).exec();
    if (user) return handleSuccess(res, user.details);

    return handleError(res, null, HTTP_STATUS.NOT_FOUND, ERROR_CODES.USER_NOT_FOUND);
  } catch (err) {
    return next(err);
  }
};

/**
 * Authentication callback
 */
const authCallback = (req, res) => {
  res.redirect('/');
};

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
  changePassword,
  me,
  authCallback,
};
