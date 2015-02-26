var Q = require('q');
var Receipt = require('../models/receipt');
var error = require('../services/error');

var list = function (req, res, next) {
    Q.ninvoke(Receipt, 'find', {
        identity: req.user.identity
    }).then(function (receipts) {
        res.send(200, receipts);
    }, error(res)).done();
};

module.exports = {
    list: list
};

