var mongoose = require('mongoose');
var createIdentity = require('./extensions/createIdentity');

/**
 * Exchange wallet
 * address - address of account with funds
 * TODO: this is part of poc implementation.
 * we have to figure out how and where to store private keys && how to use multisig
 * identity - exchange identity
 * balance - the number of founds that SHOULD be on exchange wallet, in hex
 */
var Wallet = new mongoose.Schema({
    address: String,
    identity: String,
    balance: {
        type: String,
        default: '0x'
    }
});

Wallet.pre('save', createIdentity);

module.exports = mongoose.model('wallet', Wallet);

