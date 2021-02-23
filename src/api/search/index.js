/**
 * User
 * @author: Felipe Garcia <arfgarciama@unal.edu.co>
 */

const { Router } = require("express")

const controller = require("./search.controller")

const router = new Router()

/**
 * Routes
 */

// DELETE Routes

// GET Routes

// POST Routes
router.post("/", controller.search)

// PUT Routes

module.exports = router
