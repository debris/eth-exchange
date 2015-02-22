var express = require('express');
var router = express.Router();
var auth = require('../services/auth');

var users = require('../controllers/users');
var generic = require('../controllers/generic');

router.get('/:model', auth.authenticateUser, generic.list);
router.get('/:model/:key/:id', auth.authenticateUser, generic.get);
router.post('/:model', auth.authenticateUser, generic.create);
router.post('/:model/:key/:id', auth.authenticateUser, generic.update);

module.exports = router;

