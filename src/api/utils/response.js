
const { get } = require('lodash');

const { HTTP_STATUS, ERROR_CODES } = require('../constants');

const getErrorLabel = (err, defaultMsg) => {
  const code = get(err, 'code');
  const label = get(ERROR_CODES, code, defaultMsg);

  return label;
};

const handleError = (res, err, statusCode, customErrMsg) => {
  const statusCodeLocal = statusCode || HTTP_STATUS.FAILURE;
  const errMsg = getErrorLabel(err, customErrMsg);

  const response = { status: statusCodeLocal, error: { message: errMsg, error: err } };

  return res.status(statusCodeLocal).send(response);
};

const handleSuccess = (res, data, statusCode) => {
  const statusCodeLocal = statusCode || HTTP_STATUS.OK;
  const response = { status: statusCodeLocal, response: data };

  return res.status(statusCodeLocal).send(response);
};

module.exports = {
  handleError,
  handleSuccess,
};
