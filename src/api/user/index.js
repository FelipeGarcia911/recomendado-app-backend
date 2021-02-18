/**
 * User
 * @author: Felipe Garcia <arfgarciama@unal.edu.co>
 */

const { Router } = require('express');

const controller = require('./user.controller');
const auth = require('../auth/auth.service');

const router = new Router();

/**
 * Routes
 */

// DELETE Routes
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

// GET Routes
router.get('/', controller.index);
router.get('/me', auth.isAuthenticated(), controller.me);
router.get('/:id', controller.show);

// POST Routes
router.post('/', controller.create);
router.post('/:id', auth.isAuthenticated(), controller.update);

// PUT Routes
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);

module.exports = router;
