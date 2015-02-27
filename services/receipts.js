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

    return Q.ninvoke(Receipt, 'findOneAndUpdate', {
        $or: [{
            state: 'pending' 
        }, {
            state: 'accepted'
        }, {
            state: 'finished',
            block: block,
            hash: hash
        }]
    }, {
        $set: udpateObject
    }, {
        upsert: true,
        new: false
    }).then(function (object) {
        // returns true if new receipt was created
        return object === null;
    });
};

module.exports = {
    createDepositReceipt: createDepositReceipt,
    createWithdrawReceipt: createWithdrawReceipt
};

