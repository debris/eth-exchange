var Q = require('q');
var crypto = require('crypto');

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

module.exports = createIdentity;

