var Q = require('q');
var web3 = require('./ethereum/web3');
var contracts = require('./contracts');
var Exchange = require('../models/exchange');

var findOrCreateExchange = function () {
    return Q.ninvoke(Exchange, 'findOne', {}).then(function (exchange) {
        if (exchange) {
            return exchange;
        }

        console.warn('no exchange object found in database');
        console.warn('creating new one');
        
        return contracts.createNewContract('ClientReceipt2').then(function (address) {
            // TODO: exchange object should be also initiated with owner address
            return Q.ninvoke(Exchange, 'create', {
                address: address 
            });
        });
    });
};

var verifyExchange = function (exchange) {
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

module.exports = {
    setup: setup
};

