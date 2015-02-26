var mongoose = require('mongoose');
var encryptPassword = require('./extensions/encryptPassword');
var createIdentity = require('./extensions/createIdentity');

/**
 * User is used to store data about exchange client
 * email - user email
 * password - encrypted user password
 * name - is display name of the user, by default it's user's email
 * identity - exchange identity of the user, should be used to deposit funds
 * balance - total balance of user funds stored on exchange, in hex
 */
var User = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    identity: String,
    balance: {
        type: String,
        default: '0x'
    }
});

User.pre('save', encryptPassword);
User.pre('save', createIdentity);

module.exports = mongoose.model('user', User);

