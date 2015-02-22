var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var users = require('../services/users');

module.exports = function (app) {
    
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use('local-login', new LocalStrategy(users.authFields, users.find));
    passport.use('local-register', new LocalStrategy(users.authFields, users.findOrCreate));

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        users.findById(id, done);
    });

};

