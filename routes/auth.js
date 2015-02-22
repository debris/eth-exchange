var express = require('express');
var auth = require('../services/auth');
var controller = require('../controllers/auth');

var router = express.Router();

/**
 * Setup auth routes
 */

router.post('/login', controller.login);
router.post('/register', controller.register);
router.post('/logout', auth.authenticateUser, controller.logout)

module.exports = router;

