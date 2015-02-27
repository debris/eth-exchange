var express = require('express');
var router = express.Router();
var config = require('../config/config');
var auth = require('../services/auth');

/* GET admin listing. */
router.get('/', auth.authenticateAdminWithRedirect, function(req, res, next) {
    res.render('admin', {
        title: 'EthExchange Admin',
        mockEth: config.mockEth
    });
});

module.exports = router;

