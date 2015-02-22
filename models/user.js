var mongoose = require('mongoose');
var Q = require('q');
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;

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

/**
 * Extend User model to automatically hash password before save
 */
User.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password') || !user.password) {
        return next();
    }
    
    return Q.ninvoke(bcrypt, 'genSalt', SALT_WORK_FACTOR).then(function (salt) {
        return Q.ninvoke(bcrypt, 'hash', user.password, salt);
    }).then(function (hash) {
        user.password = hash;
        next();
    }).catch(function (err) {
        console.error(err);
        next(err);
    }).done();
});

module.exports = mongoose.model('user', User);

