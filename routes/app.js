var express = require('express');
var router = express.Router();
var config = require('../config/config');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(config);
    res.render('app', { 
        title: 'EthExchange',
        mockEth: config.mockEth
    });
});

module.exports = router;

