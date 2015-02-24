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

var setWallet = function (req, res, next) {
    User.findOneAndUpdate({
        _id: req.user._id 
    }, {
        $set: {
            wallet: req.body
        }
    }).exec().then(function (user) {
        res.send(200);
    }, error(res));
};

module.exports = {
    list: list,
    current: current,
    setWallet: setWallet
};

