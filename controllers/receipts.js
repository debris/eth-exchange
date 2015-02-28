var Q = require('q');
var Receipt = require('../models/receipt');
var error = require('../services/error');
var interface = require('../services/interface');

var all = function (req, res, next) {
    return Q.ninvoke(Receipt, 'find', {}).then(function (receipts) {
        res.send(200, receipts);
    }, error(res)).done();
};

var list = function (req, res, next) {
    return Q.ninvoke(Receipt, 'find', {
        identity: req.user.identity
    }).then(function (receipts) {
        res.send(200, receipts);
    }, error(res)).done();
};

var withdraw = function (req, res, next) {
    var identity = req.user.identity;
    var value = req.body.value;
    var to = req.body.to;

    return Q.ninvoke(Receipt, 'create', {
        identity: identity,
        value: value,
        type: 'withdraw',
        state: 'pending',
        to: to
    }).then (function (receipt) {
        res.send(200);
    }, error(res)).done();
};

var accept = function (req, res, next) {
    var _id = req.body._id; 

    return Q.ninvoke(Receipt, 'findOneAndUpdate', {
        _id: _id,
        state: 'pending'
    }, {
        $set: {
            state: 'accepted'
        } 
    }).then(function (receipt) {
        // transfer money here
        return interface.get().then(function (contract) {
            contract.transfer(receipt.to, receipt.value);
        });
    }).then(function () {
        res.send(200);     
    }, error(res)).done();
};

module.exports = {
    all: all,
    list: list,
    withdraw: withdraw,
    accept: accept
};

