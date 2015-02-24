var Q = require('q');
var Operation = require('../models/operation');
var error = require('../services/error');

var list = function (req, res, next) {
    Q.ninvoke(Operation, 'find', {
        user: req.user._id
    }).then(function (operations) {
        res.send(200, operations);
    }, error(res));
};

module.exports = {
    list: list
};

