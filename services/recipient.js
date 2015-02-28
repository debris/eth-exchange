var Q = require('q');
var config = require('../config/config');
var exchange = require('./exchange');
var block = require('./block');
var interface = require('./interface');
var users = require('./users');
var web3 = require('./ethereum/web3');
var receipts = require('./receipts');

var onAnonymousDeposit = function (hash, from, value, block) {
    return receipts.createDepositReceipt(hash, '', value, from, block).then(function (created) {
        if (created) {
            return exchange.increaseExchangeBalance(value);
        }
    }).done();
};

var onDeposit = function (hash, from, identity, value, block) {
    return receipts.createDepositReceipt(hash, identity, value, from, block).then(function (created) {
        if (created) {
            return Q.all([
                users.increaseUserBalance(identity, value),
                exchange.increaseExchangeBalance(value)
            ]);
        }
    }).done();
};

var onWithdraw = function (hash, from, to, value, block) {
    return receipts.createWithdrawReceipt(hash, value, from, to, block).then(function (created) {
        if (created) {
            return Q.all([
                users.decreaseUserBalance(created.identity, value),
                exchange.decreaseExchangeBalance(value)
            ]);
        }
    }).done();
};

var onRefill = function (from, value) {

};

var onTransfer = function (from, to, value) {

};

var setupPendingWatch = function () {
    var pendingWatch = web3.eth.watch('pending').changed(function () {
        var number = web3.eth.number;
        
        console.log('new block: ' + number);

        block.updateNumber(number);
    });
};

var setupAnonymousDepositWatch = function (contract, number) {
    var depositWatch = contract.AnonymousDeposit({}, { earliest: number });
    depositWatch.changed(function (res) {

        console.log('anonymous deposit');
        console.log(JSON.stringify(res, null, 2));

        if (!res.event || !res.args._value) {
            return;
        }

        onAnonymousDeposit(res.hash, res.args._from, parseInt(res.args._value), res.number);
    });
};

var setupDepositWatch = function (contract, number) {

    var depositWatch = contract.Deposit({}, { earliest: number });
    depositWatch.changed(function (res) {

        console.log('deposit');
        console.log(JSON.stringify(res, null, 2));

        if (!res.event || !res.args._value) {
            return;
        }

        onDeposit(res.hash, res.args._from, parseInt(res.args._value), res.number);
    });
};

var setupWithdrawWatch = function (contract, number) {
    
    var withdrawWatch = contract.Withdraw({}, { earliest: number });
    withdrawWatch.changed(function (res) {
    
        console.log('withdraw');
        console.log(JSON.stringify(res, null, 2));

        if (!res.event || !res.args._value) {
            return;
        }

        onWithdraw(res.hash, res.args._from, res.args._to, parseInt(res.args._value), res.number);
    });
};

var setupWatches = function () {
    return Q.all([interface.get(), block.get()]).then(function (arr) {
        var contract = arr[0];
        var bl = arr[1];

        var number = Math.max(bl.number - 3, 0);
        setupPendingWatch();
        setupAnonymousDepositWatch(contract, number);
        setupDepositWatch(contract, number);
    });
};

module.exports = {
    setupWatches: setupWatches
};

