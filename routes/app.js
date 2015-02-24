var express = require('express');
var router = express.Router();
var config = require('../config/config');
var auth = require('../services/auth');

/* GET home page. */
router.get('/', auth.authenticateWithRedirect, function(req, res, next) {
    res.render('app', { 
        title: 'EthExchange',
        mockEth: config.mockEth
    });
});

router.get('/login', function(req, res, next) {
    res.render('login', { 
        title: 'EthExchange'
    });
});

router.get('/register', function(req, res, next) {
    res.render('register', { 
        title: 'EthExchange'
    });
});

module.exports = router;

