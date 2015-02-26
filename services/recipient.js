var Q = require('q');
var config = require('../config/config');
var exchange = require('./exchange');
var block = require('./block');
var contracts = require('./contracts');
var users = require('./users');
var web3 = require('./ethereum/web3');
var receipts = require('./receipts');

var onAnonymousDeposit = function (from, value) {

};

var onDeposit = function (from, identity, value, block) {
    Q.all([
        users.increaseUserBalance(identity, value),
        exchange.increaseExchangeBalance(value),
        receipts.createDepositReceipt(identity, value, from, block)
    ]);
};

var onRefill = function (from, value) {

};

var onTransfer = function (from, to, value) {

};

var handleUnhandledEvents = function () {
    return Q.all([exchange, block]).then(function (arr) {
        var ex = arr[0];
        var bl = arr[1];

        return contracts.getInterface(ex.address, config.contract).then(function (contract) {
            // TODO: setup filter from certain block
            var watch = web3.eth.watch(contract);
            var logs = watch.logs();
            
            // TODO: iterate over logs
        });
    });
};

var setupWatches = function () {
    return Q.all([exchange, block]).then(function (arr) {
        var ex = arr[0];
        var bl = arr[1];

        return contracts.getInterface(ex.address, config.contract).then(function (contract) {
            // TODO: setup filter from certain block
            var watch = web3.eth.watch(contract);
            watch.changed(function (res) {
                // TODO: handle this 
                console.log('res');
                console.log(JSON.stringify(res, null, 2));
            });

            // test only
            var w2 = contract.Deposit();
            w2.changed(function (res) {
                console.log('res2');
                console.log(JSON.stringify(res, null, 2));
                if (!res.event) {
                    return;
                }
                onDeposit(res.args._from, res.args._id.slice(2), parseInt(res.args._value), res.number);
            });
        });
    });
};

module.exports = {
    onAnonymousDeposit: onAnonymousDeposit,
    onDeposit: onDeposit,
    onRefill: onRefill,
    onTransfer: onTransfer,
    handleUnhandledEvents: handleUnhandledEvents,
    setupWatches: setupWatches
};

