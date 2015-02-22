var passport = require('passport');

/**
 * This controller should be used to handle login, reqister && logout
 */

var login = passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login'
});

var register = passport.authenticate('local-register', {
    successRedirect: '/',
    failureRedirect: '/register'
});

var logout = function (req, res) {
    req.logout();
    res.send(200);
};

module.exports = {
    login: login,
    register: register,
    logout: logout
};

