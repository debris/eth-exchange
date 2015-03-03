var Q = require('q');
var Receipt = require('../models/receipt');

var createIncomesReceipt = function (hash, value, from, block, type, identity) {
    return Q.ninvoke(Receipt, 'findOneAndUpdate', {
        block: block,
        hash: hash
    }, {
        hash: hash,
        identity: identity || '',
        value: value,
        type: type, 
        state: 'finished',
        from: from,
        block: block
    }, {
        upsert: true,
        new: false
    }).then(function (object) {
        // returns true if new receipt was created
        return object === null || object.state !== 'finished';
    });
};

var createOutgoesReceipt = function (hash, value, from, to, block, type) {
    var updateObject = {
        hash: hash,
        value: value,
        type: type,
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

var createDepositReceipt = function (hash, identity, value, from, block) {
    return createIncomesReceipt(hash, value, from, block, 'deposit', identity);
};

var createRefillReceipt = function (hash, value, from, block) {
    return createIncomesReceipt(hash, value, from, block, 'refill');
};

var createWithdrawReceipt = function (hash, value, from, to, block) {
    return createOutgoesReceipt(hash, value, from, to, block, 'withdraw');
};

var createDrainReceipt = function (hash, value, from, to, block) {
    return createOutgoesReceipt(hash, value, from, to, block, 'drain');
};

module.exports = {
    createDepositReceipt: createDepositReceipt,
    createWithdrawReceipt: createWithdrawReceipt,
    createRefillReceipt: createRefillReceipt,
    createDrainReceipt: createDrainReceipt
};

