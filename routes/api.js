var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Operation = require('../models/operation');
var Wallet = require('../models/wallet');
var contract = require('../services/contract');
var auth = require('../services/auth');

var models = {
    users: User,
    operations: Operation,
    wallets: Wallet
};

var onError = function (res) {
    return function (err) {
        console.error(err);
        res.send(500, err);
    };
};

router.get('/:model', auth.authenticateUser, function (req, res, next) {
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

router.post('/users', function (req, res, next) {
    return User.create(req.body).then(function () {
        // because it is possible to create multiple models at once, we need to handle them
        var users = Array.prototype.slice.call(arguments);
        users.forEach(function (user) {
            // TODO: optimize loading contracts, if we really will to create multiple users
            // TODO: if contract creation fails, user should not be created
            contract.createNewContract('ClientReceipt').then(function (address) {
                user.address = address; 
                user.markModified('address');
                user.save();
                res.send(200);
            }, onError(res));
        });
    }, onError(res));
});

router.post('/:model', function (req, res, next) {
    var model = models[req.params.model];
    if (!model) {
        res.send(400);
        return;
    }
    return model.create(req.body).then(function () {
        // because it is possible to create multiple models at once, we need to handle them
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

