/**
 * Auth Local configuration
 * @author: Felipe Garcia <arfgarciama@unal.edu.co>
 */

const { get } = require('lodash');
const express = require('express');
const passport = require('passport');

const { HTTP_STATUS } = require('../../constants');
const { handleSuccess, handleError } = require('../../utils/response');
const { signToken } = require('../auth.service');

const router = express.Router();

router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err || !user) {
      const msgError = get(info, 'message', '');
      return handleError(res, err, HTTP_STATUS.UNAUTHORIZED, msgError);
    }

    const userToken = {
      name: user.name,
      email: user.email,
      profile: user.profile,
    };
    const token = signToken(user._id, userToken);
    return handleSuccess(res, { token });
  })(req, res, next);
});

module.exports = router;
