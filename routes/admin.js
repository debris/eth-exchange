var express = require('express');
var router = express.Router();

/* GET admin listing. */
router.get('/', function(req, res, next) {
    res.render('admin', {
        title: 'EthExchange Admin',
        mockEth: config.mockEth,
        eth: config.eth // inject ethereum host to browser
    });
});

module.exports = router;

