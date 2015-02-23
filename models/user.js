var mongoose = require('mongoose');
var extension = require('./extensions/user');

/**
 * User is used to store exchange related data about user
 * email - user email
 * password - encrypted user password
 * name - is display name of the user, by default it's user's email
 * identity - exchange identity of the user, should be used to deposit funds
 * address - blockchain address of user hot wallet
 * balance - total balance of user funds stored in hot and cold wallet together, in hex
 */
var User = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    identity: String,
    address: String,
    balance: {
        type: String,
        default: '0x'
    }
});

User.pre('save', extension.encryptPassword);
User.pre('save', extension.createIdentity);

module.exports = mongoose.model('user', User);

