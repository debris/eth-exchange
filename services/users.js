var User = require('../models/user');
var Q = require('q');
var bcrypt = require('bcryptjs');

var authFields = {
    usernameField: 'email',
    passwordField: 'password'
};

var comparePassword = function(candidatePassword, hash) {
    return Q.ninvoke(bcrypt, 'compare', candidatePassword, hash);
};

var findOrCreate = function (email, password, done) {
    Q.ninvoke(User, 'findOne', {email: email}).then(function (user) {
        if (!user) {
            return Q.ninvoke(User, 'create', {
                email: email,
                password: password,
                name: email
            }).then(function (user) {
                done(null, user);  
            });
        }

        return comparePassword(password, user.password).then(function (match) {
            return match ? done(null, user) : done(null, false, {
                message: "User already exists " + email
            }); 
        });
    }).catch(function (err) {
        console.error(err);
        done(null, false, {
            message: "Internal error occurred"
        });
    }).done();
};

var find = function (email, password, done) {
    Q.ninvoke(User, 'findOne', {email: email}).then(function (user) {
        if (!user) {
            return done(null, false, {
                message: "Cannot find user " + email
            });
        }
        
        return comparePassword(password, user.password).then(function (match) {
            return match ? done(null, user) : done(null, false, {
                message: "Cannot find user " + email
            }); 
        });
    }).catch(function (err) {
        console.err(err);
        done(null, false, {
            message: "Internal error occurred"
        });
    }).done();
}; 

var findById = function (id, callback) {
    User.findById(id, callback);
};

module.exports = {
    findOrCreate: findOrCreate,
    find: find,
    authFields: authFields,
    findById: findById
};

