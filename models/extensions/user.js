var Q = require('q');
var bcrypt = require('bcryptjs');
var crypto = require('crypto');
var SALT_WORK_FACTOR = 10;

/**
 * Extend User model to automatically hash password before save
 */
var encryptPassword = function (next) {
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
};

/**
 * Create new user identity
 */
var createIdentity = function (next) {
    var user = this;
    if (user.identity) {
        return next();
    }

    // maybe "pseudoRandomBytes" should be replaced with "randomBytes"
    return Q.ninvoke(crypto, 'pseudoRandomBytes', 32).then(function (buff) {
        user.identity = buff.toString('hex');
        next();
    }).catch(function (err) {
        console.error(err);
        next(err);
    }).done();
};

module.exports = {
    encryptPassword: encryptPassword,
    createIdentity: createIdentity
};

