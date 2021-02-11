/**
 * User
 * @author: Cristian Moreno Zuluaga <khriztianmoreno@gmail.com>
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

// PUT Routes
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);

module.exports = router;
