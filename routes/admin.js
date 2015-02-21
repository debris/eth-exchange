var express = require('express');
var router = express.Router();
var config = require('../config/config');

/* GET admin listing. */
router.get('/', function(req, res, next) {
    res.render('admin', {
        title: 'EthExchange Admin',
        mockEth: config.mockEth
    });
});

module.exports = router;

