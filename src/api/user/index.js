/**
 * User
 * @author: Cristian Moreno Zuluaga <khriztianmoreno@gmail.com>
 */

const { Router } = require('express');

const controller = require('./user.controller');
const auth = require('../../auth/auth.service');

const router = new Router();

/**
 * Routes
 */

// DELETE Routes
router.delete('/:id', controller.destroy);

// GET Routes
router.get('/:id', controller.show);
router.get('/', controller.index);
router.get('/me', auth.isAuthenticated(), controller.me);

// POST Routes
router.post('/', controller.create);

// PUT Routes
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);

module.exports = router;
