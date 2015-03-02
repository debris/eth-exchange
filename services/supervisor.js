var Q = require('q');
var Receipt = require('../models/receipt');
var coldwallets = require('./coldwallets');
var exchange = require('./exchange');
var interface = require('./interface');

var perfectBalance = function (exchange) {
    return (exchange.drain + exchange.refill) / 2;
};

var check = function (exchange) {
    if (exchange.expectedBalance > exchange.drain) {
        var value = exchange.expectedBalance - perfectBalance(exchange);
        if (!value) {
            return Q();
        }

        return coldwallets.getColdwalletForDrain().then(function (coldwallet) {

            if (!coldwallet) {
                return;
            }

            return Q.ninvoke(Receipt, 'findOneAndUpdate', {
                type: 'drain',
                state: 'accepted'
            }, {
                type: 'drain',
                state: 'accepted',
                value: value,
                to: coldwallet.address
            }, {
                upsert: true,
                new: false
            }).then(function (old) {
                if (old) {
                    return;
                }
            
                return interface.get().then(function (contract) {
                    contract.drain(coldwallet.to, value);
                });
            });
        }); 
    } else (exchange.expectedBalance < exchange.refill) {
        return exchange.needsRefill(true).then(function (changed) {
            if (changed) {
                // send email or do whatever else if it needs refill
            }
        });
    } 
};

module.exports = {
    check: check
};

