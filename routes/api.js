var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Operation = require('../models/operation');

var models = {
    users: User,
    operations: Operation
};

var onError = function (res) {
    return function (err) {
        console.error(err);
        res.send(500, err);
    };
};

router.get('/:model', function (req, res, next) {
    var model = models[req.params.model];
    if (!model) {
        res.send(400);
        return;
    }
    return model.find({}).exec().then(function (objects) {
        res.send(200, objects);
    }, onError(res));
});

router.get('/:model/:key/:id', function (req, res, next) {
    var model = models[req.params.model];
    if (!model) {
        res.send(400);
        return;
    }
    var conditions = {};
    conditions[req.params.key] = req.params.id;
    return model.findOne(conditions).exec().then(function (object) {
        res.send(200, object);
    }, onError(res));
});

router.post('/:model', function (req, res, next) {
    var model = models[req.params.model];
    if (!model) {
        res.send(400);
        return;
    }
    return model.create(req.body).then(function () {
        res.send(200);
    }, onError(res));
});

router.post('/:model/:key/:id', function (req, res, next) {
    var model = models[req.params.model];
    if (!model) {
        res.send(400);
        return;
    }
    var conditions = {};
    conditions[req.params.key] = req.params.id;
    return model.findOneAndUpdate(conditions, req.body).exec().then(function () {
        res.send(200);
    }, onError(res));
});


module.exports = router;

