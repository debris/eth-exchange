var Q = require('q');
var User = require('../models/user');
var error = require('../services/error');

var models = {
    users: User
};

var findModel = function (name) {
    return Q(models[name]).then(function (model) {
        if (!model)
            throw new Error("Model does not exist");
        return model;
    });
};

var list = function (req, res, next) {
    findModel(req.params.model).then(function (model) {
        return Q.ninvoke(model, 'find', {});
    }).then(function (objects) {
        res.send(200, objects);
    }, error(res)).done();
};

var get = function (req, res, next) {
    findModel(req.params.model).then(function (model) {
        var conditions = {};
        conditions[req.params.key] = req.params.id;
        return Q.ninvoke(model, 'find', conditions);
    }).then(function (object) {
        res.send(200, object);
    }, error(res)).done();
};

var create = function (req, res, next) {
    findModel(req.params.model).then(function (model) {
        return Q.ninvoke(model, 'create', req.body);
    }).then(function (objects) {
        res.send(200);
    }, error(res)).done();
};

var update = function (req, res, next) {
    findModel(req.params.model).then(function (model) {
        var conditions = {};
        conditions[req.params.key] = req.params.id;
        return Q.ninvoke(model, 'findOneAndUpdate', conditions, req.body);
    }).then(function (model) {
        res.send(200);
    }, error(res)).done();
};

module.exports = {
    list: list,
    get: get,
    create: create,
    update: update
};



