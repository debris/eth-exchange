var Q = require('q');
var Receipt = require('../models/receipt');
var coldwallets = require('./coldwallets');
var exchange = require('./exchange');
var interface = require('./interface');
var users = require('./users');
var mailer = require('./mailer');

var perfectBalance = function (exchange) {
    return (exchange.drain + exchange.refill) / 2;
};

var check = function () {
    return exchange.get().then(function (ex) {
        if (ex.expectedBalance > ex.drain) {
            // TODO mark needsRefill to false also here!?
            var value = ex.expectedBalance - perfectBalance(ex);
            if (!value) {
                return;
            }

            return coldwallets.getColdwalletForDrain().then(function (coldwallet) {

                if (!coldwallet) {
                    return mailer.sendMailToAdmins('Drain', 'Exchange needs to drain ' + value + 'ETH, but there is no coldwallet available');
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
                    }).then(function () {
                        return mailer.sendMailToAdmins('Drain', 'Started drain from hotwallet. Draining ' + value + 'ETH.');
                    });
                });
            }); 
        } else if (ex.expectedBalance < ex.refill) {
            return exchange.needsRefill(true).then(function (changed) {
                if (changed) {
                    // send email or do whatever else if it needs refill
                    return mailer.sendMailToAdmins('Refill', 'Exchange needs to be refilled.');
                }
            });
        } else {
            return exchange.needsRefill(false);
        } 
    });
};

module.exports = {
    check: check
};

