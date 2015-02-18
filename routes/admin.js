var express = require('express');
var router = express.Router();

/* GET admin listing. */
router.get('/', function(req, res, next) {
    res.render('admin', { title: 'EthExchangeAdmin' });
});

module.exports = router;
