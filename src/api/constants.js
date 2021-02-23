const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ERROR: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  FAILURE: 500,
}

const ERROR_CODES = {
  DUPLICATED_USER: "Duplicated email, please check your email.",
  USER_NOT_FOUND: "User not found, please try again.",
  WRONG_PASSWORD: "Incorrect password, please try again.",
  0: "Unexpected error",
  11000: "Duplicated field",
}

module.exports = {
  HTTP_STATUS,
  ERROR_CODES,
}
