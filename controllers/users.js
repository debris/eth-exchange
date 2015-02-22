var User = require('../models/user');
var error = require('../services/error');

/**
 * Users api
 */

var list = function (req, res, next) {
    User.find({}).exec().then(function (users) {
        res.send(200, users);
    }, error).done();
};

module.exports = {
    list: list
};

