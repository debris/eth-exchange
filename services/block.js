var Q = require('q');
var Block = require('../models/block');

var get = function () {
    return Q.ninvoke(Block, 'findOne', {});
};

var findOrCreateBlock = function () {
    return get().then(function (block) {
        if (block) {
            return block;
        }

        console.warn('no block info found in database');
        console.warn('creating new one');

        return Q.ninvoke(Block, 'create', {
            number: 0
        });
    });
};

var verifyBlock = function (block) {
    // TODO: block number cannot be higher than web3.eth.blockNumber

    console.log('block number: ' + block.number);
};

var setup = function () {
    return findOrCreateBlock()
        .then(verifyBlock);
};

var updateNumber = function (number) {
    return Q.ninvoke(Block, 'findOneAndUpdate', {}, {
        $set: {
            number: number
        }
    });
};

module.exports = {
    setup: setup,
    get: get,
    updateNumber: updateNumber
};

