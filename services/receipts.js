var Q = require('q');
var Receipt = require('../models/receipt');

var createDepositReceipt = function (identity, value, from, block) {
    return Q.ninvoke(Receipt, 'create', {
        identity: identity,
        value: value,
        type: 'deposit',
        state: 'finished',
        from: from,
        block: block
    });
};

module.exports = {
    createDepositReceipt: createDepositReceipt
};

