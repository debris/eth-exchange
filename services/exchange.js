var Q = require('q');
var config = require('../config/config');
var web3 = require('./ethereum/web3');
var contracts = require('./contracts');
var Exchange = require('../models/exchange');

var get = function () {
    return Q.ninvoke(Exchange, 'findOne', {});
};

var findOrCreateExchange = function () {
    return get().then(function (exchange) {
        if (exchange) {
            return exchange;
        }

        console.warn('no exchange object found in database');
        console.warn('creating new one');
        
        return contracts.createNewContract(config.contract).then(function (address) {
            // TODO: exchange object should be also initiated with owner address
            return Q.ninvoke(Exchange, 'create', {
                address: address 
            });
        });
    });
};

var verifyExchange = function (exchange) {
    console.log('exchange address: ' + exchange.address);
    var accounts = web3.eth.accounts; 
    var success = false;
    for (var i = 0; i < accounts.length && !success; i++) {
        success = exchange.owner === accounts[i];
    }

    if (!success) {
        // temporary comment
        // throw new Error('exchange verification failed');
    }
};

var setup = function () {
    return findOrCreateExchange()
        .then(verifyExchange);
};

var increaseExchangeBalance = function (value) {
    return Q.ninvoke(Exchange, 'findOneAndUpdate', {
    }, {
        $inc: {
            expectedBalance: value 
        }
    });
};

var decreaseExchangeBalance = function (value) {
    return increaseExchangeBalance(-value);
};

module.exports = {
    setup: setup,
    get: get,
    increaseExchangeBalance: increaseExchangeBalance,
    decreaseExchangeBalance: decreaseExchangeBalance
};

