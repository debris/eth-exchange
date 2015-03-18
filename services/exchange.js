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
        }).then(function (exchange) {
            console.log('waiting for the block to be mined');

            var deferred = Q.defer();
            var watch = web3.eth.filter('pending');
            var counter = 0;
            watch.watch(function (res) {
                if (++counter > 1) {
                    deferred.resolve(exchange);
                    watch.uninstall();
                }
            });
            return deferred.promise;
        });
    });
};

var verifyExchange = function (exchange) {
    console.log('exchange address: ' + exchange.address);

    var code = web3.eth.getData(exchange.address);
    console.log('exchange code: ' + code); 
    
    if (code === '0x0000000000000000000000000000000000000000000000000000000000000000') {
        throw new Error('exchange verification failed');
    }
    
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

var needsRefill = function (needs) {
    return Q.ninvoke(Exchange, 'findOneAndUpdate', {
        needsRefill: !needs
    }, {
        $set: {
            needsRefill: needs,
            needsDrain: false
        }
    }, {
        new: false
    }).then(function (exchange) {
        // return true if state has changed
        return exchange !== null && exchange.needsRefill !== needs;
    });
};

var needsDrain = function (needs) {
    return Q.ninvoke(Exchange, 'findOneAndUpdate', {
        needsDrain: !needs
    }, {
        $set: {
            needsDrain: needs,
            needsRefill: false
        }
    }, {
        new: false
    }).then(function (exchange) {
        // return true if state has changed
        return exchange !== null && exchange.needsDrain !== needs;
    });
};

var noDrainNoRefill = function () {
    return Q.ninvoke(Exchange, 'findOneAndUpdate', {}, {
        $set: {
            needsRefill: false,
            needsDrain: false
        }
    });
};

var updateThresholds = function (refill, drain) {
    return Q.ninvoke(Exchange, 'findOneAndUpdate', {}, {
        $set: {
            refill: refill,
            drain: drain
        }
    });
};

module.exports = {
    setup: setup,
    get: get,
    increaseExchangeBalance: increaseExchangeBalance,
    decreaseExchangeBalance: decreaseExchangeBalance,
    needsRefill: needsRefill,
    needsDrain: needsDrain,
    noDrainNoRefill: noDrainNoRefill,
    updateThresholds: updateThresholds
};

