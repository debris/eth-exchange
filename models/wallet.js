var mongoose = require('mongoose');

/**
 * Exchange wallet
 * address - address of account with funds
 * TODO: this is part of poc implementation.
 * we have to figure out how and where to store private keys && how to use multisig
 * balance - the number of founds that SHOULD be on exchange wallet, in hex
 */
var Wallet = new mongoose.Schema({
    address: String,
    balance: {
        type: String,
        default: '0x'
    }
});

module.exports = mongoose.model('wallet', Wallet);

