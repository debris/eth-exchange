var express = require('express');
var router = express.Router();
var auth = require('../services/auth');

var users = require('../controllers/users');
var contracts = require('../controllers/contracts');
var generic = require('../controllers/generic');

router.get('/contracts', auth.authenticateUser, contracts.list);
router.get('/contracts/:name', auth.authenticateUser, contracts.get);
router.get('/user', auth.authenticateUser, users.current);
router.post('/user/setWallet', auth.authenticateUser, users.setWallet);
router.get('/:model', auth.authenticateUser, generic.list);
router.get('/:model/:key/:id', auth.authenticateUser, generic.get);
router.post('/:model', auth.authenticateUser, generic.create);
router.post('/:model/:key/:id', auth.authenticateUser, generic.update);

module.exports = router;

