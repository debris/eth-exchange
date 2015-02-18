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

router.get('/users/:id', function (req, res, next) {
    return User.findOne({_id: req.params.id}).exec().then(function (user) {
        res.send(200, user);
    }, onError(res));
});

router.post('/users', function (req, res, next) {
    return User.create(req.body).then(function () {
        res.send(200);
    }, onError(res));
});

router.put('/users/:id', function (req, res, next) {
    return User.findOneAndUpdate({_id: req.params.id}, req.body).exec().then(function () {
        res.send(200);
    }, onError(res));
});


module.exports = router;

