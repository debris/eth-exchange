var Q = require('q');
var config = require('../config/config');
var exchange = require('./exchange');
var block = require('./block');
var contracts = require('./contracts');
var web3 = require('./ethereum/web3');

var onAnonymousDeposit = function (from, value) {

};

var onDeposit = function (from, identity, value) {

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
    return Q();
};

module.exports = {
    onAnonymousDeposit: onAnonymousDeposit,
    onDeposit: onDeposit,
    onRefill: onRefill,
    onTransfer: onTransfer,
    handleUnhandledEvents: handleUnhandledEvents,
    setupWatches: setupWatches
};

