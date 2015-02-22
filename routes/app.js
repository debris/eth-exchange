var express = require('express');
var router = express.Router();
var config = require('../config/config');
var passport = require('passport');
var auth = require('../services/auth');

router.post('/auth/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.post('/auth/register', passport.authenticate('local-register', {
    successRedirect: '/',
    failureRedirect: '/register'
}));

router.post('/auth/logout', auth.authenticateUser, function (req, res) {
    req.logout();
    res.send(200);
});

/* GET home page. */
router.get('/', auth.authenticateWithRedirect, function(req, res, next) {
    console.log(config);
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

