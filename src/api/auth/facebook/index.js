/**
 * Auth Facebook configuration
 * @author: Felipe Garcia <arfgarciama@unal.edu.co>
 */

const express = require("express")
const passport = require("passport")
const { setTokenCookie } = require("../auth.service")
const { signToken } = require("../auth.service")

const router = express.Router()

router
  .get(
    "/",
    passport.authenticate("facebook", {
      scope: ["email", "user_about_me", "public_profile"],
      failureRedirect: "/signup",
      session: false,
    })
  )
  .get(
    "/callback",
    passport.authenticate("facebook", {
      failureRedirect: "/signup",
      session: false,
    }),
    setTokenCookie
  )
  .post("/", passport.authenticate("facebook-token"), (req, res) => {
    const { user } = req
    if (!user) {
      return res.status(401).json({ message: "Error" })
    }
    const userToken = {
      name: user.name,
      email: user.email,
      additionalData: user.additionalData,
    }
    const token = signToken(user._id, userToken)
    res.json({ token })
  })

module.exports = router
