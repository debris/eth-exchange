var Q = require('q');
var config = require('../config/config');
var exchange = require('./exchange');
var block = require('./block');
var interface = require('./interface');
var users = require('./users');
var web3 = require('./ethereum/web3');
var receipts = require('./receipts');
var mailer = require('./mailer');
var supervisor = require('./supervisor');
var coldwallets = require('./coldwallets');

var logExchangeBalance = function (exchange) {
    var balance = web3.eth.getBalance(exchange.address);
    console.log("blockchain exchange balance: ", web3.toDecimal(balance));
    return exchange;
};

var mailUserOnDeposit = function (value) {
    return function (user) {
        return mailer.sendMail(user.email, 'Deposit', 'Thank you for depositing ' + value + 'ETH on eth-exchange');
    };
};

var mailUserOnWithdraw = function (value) {
    return function (user) {
        return mailer.sendMail(user.email, 'Withdraw', 'You withdrawn ' + value + 'ETH. Thank you for using eth-exchange');
    };
};

var mailAdminsOnRefill = function (value) {
    return function () {
        return mailer.sendMailToAdmins('Refill', 'Refill of ' + value + 'ETH finished');
    };
};

var mailAdminsOnDrain = function (value) {
    return function () {
        return mailer.sendMailToAdmins('Drain', 'Drain of ' + value + 'ETH finished');
    };
};

var onAnonymousDeposit = function (hash, from, value, block) {
    return receipts.createDepositReceipt(hash, '', value, from, block).then(function (created) {
        if (created) {
            return exchange.increaseExchangeBalance(value)
        }
    }).done();
};

var onDeposit = function (hash, from, identity, value, block) {
    return receipts.createDepositReceipt(hash, identity, value, from, block).then(function (created) {
        if (created) {
            return Q.all([
                users.increaseUserBalance(identity, value).then(mailUserOnDeposit(value)),
                exchange.increaseExchangeBalance(value)
            ]);
        }
    }).done();
};

var onWithdraw = function (hash, from, to, value, block) {
    return receipts.createWithdrawReceipt(hash, value, from, to, block).then(function (created) {
        if (created) {
            return Q.all([
                users.decreaseUserBalance(created.identity, value).then(mailUserOnWithdraw(value)),
                exchange.decreaseExchangeBalance(value)
            ]);
        }
    }).done();
};

var onRefill = function (hash, from, value, block) {
    return receipts.createRefillReceipt(hash, value, from, block).then(function (created) {
        if (created) {
            return Q.all([
                exchange.increaseExchangeBalance(value).then(mailAdminsOnRefill(value)),
                coldwallets.decreaseColdwalletBalance(to, value)
            ]);
        }
    }).done();
};

var onDrain = function (hash, from, to, value, block) {
    return receipts.createDrainReceipt(hash, value, from, to, block).then(function (created) {
        if (created) {
            return Q.all([
                exchange.decreaseExchangeBalance(value).then(mailAdminsOnDrain(value)),
                coldwallets.increaseColdwalletBalance(to, value)
            ]);
        }
    }).done();
};

var setupPendingWatch = function () {
    var pendingWatch = web3.eth.filter('pending').watch(function () {
        var number = web3.eth.blockNumber;
        
        console.log('new block: ' + number);

        block.updateNumber(number).done();
        exchange.get().then(logExchangeBalance).done();
        supervisor.check().done();
    });
};

var setupAnonymousDepositWatch = function (contract, number) {
    var depositWatch = contract.AnonymousDeposit({}, { fromBlock: number });
    depositWatch.watch(function (res) {

        console.log('anonymous deposit');
        console.log(JSON.stringify(res, null, 2));

        if (!res.event || !res.args._value) {
            return;
        }

        onAnonymousDeposit(res.hash, res.args._from, parseInt(res.args._value), res.number);
    });
};

var setupDepositWatch = function (contract, number) {

    var depositWatch = contract.Deposit({}, { fromBlock: number });
    depositWatch.watch(function (res) {

        console.log('deposit');
        console.log(JSON.stringify(res, null, 2));

        if (!res.event || !res.args._value) {
            return;
        }

        onDeposit(res.hash, res.args._from, res.args._id.slice(2), parseInt(res.args._value), res.number);
    });
};

var setupWithdrawWatch = function (contract, number) {
    
    var withdrawWatch = contract.Withdraw({}, { fromBlock: number });
    withdrawWatch.watch(function (res) {
    
        console.log('withdraw');
        console.log(JSON.stringify(res, null, 2));

        if (!res.event || !res.args._value) {
            return;
        }

        onWithdraw(res.hash, res.args._from, res.args._to, parseInt(res.args._value), res.number);
    });
};

var setupDrainWatch = function (contract, number) {

    var drainWatch = contract.Drain({}, { fromBlock: number });
    drainWatch.watch(function (res) {

        console.log('drain');
        console.log(JSON.stringify(res, null, 2));

        if (!res.event || !res.args._value) {
            return;
        }

        onDrain(res.hash, res.args._from, res.args._to, parseInt(res.args._value), res.number);
    });
};

var setupRefillWatch = function (contract, number) {

    var refillWatch = contract.Refill({}, { fromBlock: number });
    refillWatch.watch(function (res) {

        console.log('refill');
        console.log(JSON.stringify(res, null, 2));

        if (!res.event || !res.args._value) {
            return;
        }

        onRefill(res.hash, res.args._from, parseInt(res.args._value), res.number);
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
        setupWithdrawWatch(contract, number);
        setupDrainWatch(contract, number);
        setupRefillWatch(contract, number);
    });
};

module.exports = {
    setupWatches: setupWatches
};

