var User = require('../models/user');
var error = require('../services/error');

/**
 * Users api
 */

var list = function (req, res, next) {
    User.find({}).exec().then(function (users) {
        res.send(200, users);
    }, error(res));
};

var current = function (req, res, next) {
    res.send(200, req.user);
};

module.exports = {
    list: list,
    current: current
};

