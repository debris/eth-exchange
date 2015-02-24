var mongoose = require('mongoose');
var encryptPassword = require('./extensions/encryptPassword');
var createIdentity = require('./extensions/createIdentity');

/**
 * User is used to store exchange related data about user
 * email - user email
 * password - encrypted user password
 * name - is display name of the user, by default it's user's email
 * identity - exchange identity of the user, should be used to deposit funds
 * assets - number exchange assets owned by user
 * wallet.address - blockchain address of user hot wallet
 * wallet.name - contract name of user's wallet (eg. ClientReceipt, Custom)
 * wallet.owner - address of contract owner
 * balance - total balance of user funds stored in hot and cold wallet together, in hex
 */
var User = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    identity: String,
    assets: {
        type: Number,
        default: 0
    },
    wallet: {
        address: String,
        name: String,
        owner: String
    },
    balance: {
        type: String,
        default: '0x'
    }
});

User.pre('save', encryptPassword);
User.pre('save', createIdentity);

module.exports = mongoose.model('user', User);

