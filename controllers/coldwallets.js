var Q = require('q');
var Coldwallet = require('../models/coldwallet');
var error = require('../services/error');

var all = function (req, res, next) {
    return Q.ninvoke(Coldwallet, 'find', {}).then(function (coldwallets) {
        res.send(200, coldwallets);
    }, error(res)).done();
};

var create = function (req, res, next) {
    return Q.ninvoke(Coldwallet, 'create', req.body).then(function (coldwallet) {
        res.send(200); 
    }, error(res)).done();
};

var update = function (req, res, next) {
    var id = req.params.coldwallet;
    delete req.body._id;
    return Q.ninvoke(Coldwallet, 'findOneAndUpdate', {
        _id: id
    }, req.body).then(function (coldwallet) {
        res.send(200);
    }, error(res)).done();
};

module.exports = {
    all: all,
    create: create,
    update: update
};

