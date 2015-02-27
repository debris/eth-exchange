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
        // returns true if new object was created
        return object === null;
    });
};

module.exports = {
    createDepositReceipt: createDepositReceipt
};

