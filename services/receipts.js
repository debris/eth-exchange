var Q = require('q');
var Receipt = require('../models/receipt');

var createDepositReceipt = function (hash, identity, value, from, block) {
    return Q.ninvoke(Receipt, 'findOneAndUpdate', {
        block: block,
        hash: hash
    }, {
        hash: hash,
        identity: identity,
        value: value,
        type: 'deposit',
        state: 'finished',
        from: from,
        block: block
    }, {
        upsert: true,
        new: false
    }).then(function (object) {
        // returns true if new receipt was created
        return object === null;
    });
};

var createWithdrawReceipt = function (hash, value, from, to, block) {
    var updateObject = {
        hash: hash,
        value: value,
        type: 'withdraw',
        state: 'finished',
        from: from,
        to: to,
        block: block
    };

    // TODO: handle transactions from outside the exchange
    return Q.ninvoke(Receipt, 'findOneAndUpdate', {
        $or: [{
            state: 'pending',
            to: to,
            value: value
        }, {
            state: 'accepted',
            to: to,
            value: value
        }]
    }, {
        $set: updateObject 
    }, {
    }).then(function (object) {
        // returns object 
        return object; 
    });
};

module.exports = {
    createDepositReceipt: createDepositReceipt,
    createWithdrawReceipt: createWithdrawReceipt
};

