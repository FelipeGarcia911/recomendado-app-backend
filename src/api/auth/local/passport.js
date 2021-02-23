/**
 * Auth Local passport configuration
 * @author: Felipe Garcia <arfgarciama@unal.edu.co>
 */

const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy

const { ERROR_CODES } = require("../../constants")

const localAuthenticate = async (User, email, password, done) => {
  try {
    const userEmail = email.toLowerCase()
    const user = await User.findOne({ email: userEmail }).exec()
    if (user) {
      const isValidPassword = await user.matchPassword(password)
      if (isValidPassword) {
        return done(null, user)
      }
      return done(null, false, { message: ERROR_CODES.WRONG_PASSWORD })
    }
    return done(null, false, { message: ERROR_CODES.USER_NOT_FOUND })
  } catch (error) {
    return done(error)
  }
}

function setup(User) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      (email, password, done) => localAuthenticate(User, email, password, done)
    )
  )
}

module.exports = { setup }
