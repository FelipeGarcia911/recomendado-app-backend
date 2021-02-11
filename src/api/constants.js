const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ERROR: 400,
  NOT_FOUND: 404,
  FAILURE: 500,
};

const ERROR_CODES = {
  DUPLICATED_USER: 'Duplicated email, please login instead',
  USER_NOT_FOUND: 'User not found, please try again',
  0: 'Unexpected error',
  11000: 'Duplicated field',
};

module.exports = {
  HTTP_STATUS,
  ERROR_CODES,
};
