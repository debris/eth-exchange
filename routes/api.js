var express = require('express');
var router = express.Router();
var User = require('../models/user');

var onError = function (res) {
    return function (err) {
        console.error(err);
        res.send(500, err);
    };
};

router.get('/users', function (req, res, next) {
    return User.find({}).exec().then(function (users) {
        res.send(200, users);
    }, onError(res));
});

router.get('/users/:key/:id', function (req, res, next) {
    var conditions = {};
    conditions[req.params.key] = req.params.id;
    return User.findOne(conditions).exec().then(function (user) {
        res.send(200, user);
    }, onError(res));
});

router.post('/users', function (req, res, next) {
    return User.create(req.body).then(function () {
        res.send(200);
    }, onError(res));
});

router.post('/users/:key/:id', function (req, res, next) {
    var conditions = {};
    conditions[req.params.key] = req.params.id;
    return User.findOneAndUpdate(conditions, req.body).exec().then(function () {
        res.send(200);
    }, onError(res));
});


module.exports = router;

