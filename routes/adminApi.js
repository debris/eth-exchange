var express = require('express');
var router = express.Router();
var User = require('../models/user');

var onError = function (res) {
    return function (err) {
        console.error(err);
        res.send(err);
    };
};

router.get('/users', function (req, res, next) {
    return User.find({}).exec().then(function (users) {
        res.send(200, users);
    }, onError(res));
});

router.get('/users/:identity', function (req, res, next) {
    return User.findOne({identity: identity}).exec().then(function (user) {
        res.send(200, user);
    }, onError(res));
});

router.post('/users', function (req, res, next) {
    return User.create(req.body).then(function () {
        res.send(200);
    }, onError(res));
});

router.put('/users/:identity', function (req, res, next) {
    return User.findOneAndUpdate({identity: identity}, req.body).exec().then(function () {
        res.send(200);
    }, onError(res));
});


module.exports = router;

