/**
 * Should configure exchange wallet if not wallet exists
 */

var Wallet = require('../models/wallet');
var web3 = require('../services/ethereum/web3');

var setup = function () {
    var address = web3.eth.accounts[0];
    var balance = web3.eth.balanceAt(address);

    return Wallet.findOneAndUpdate({}, {
        address: address,
        balance: balance 
    }, { upsert: true }).exec();
};

module.exports = {
    setup: setup
};

