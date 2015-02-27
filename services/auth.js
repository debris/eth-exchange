
var authenticateUser = function (req, res, next) {
    if (!req.user) {
        return res.send(401);
    }
    next();
};

var authenticateAdmin = function (req, res, next) {
    if (!req.user || req.user.role !== 'admin') {
        return res.send(401); 
    }
    next();
};

var authenticateUserWithRedirect = function (req, res, next) {
    if (!req.user) {
        return res.redirect('/login');
    }
    next();
};

var authenticateAdminWithRedirect = function (req, res, next) {
    if (!req.user || req.user.role !== 'admin') {
        return res.redirect('/login');
    }
    next();
};

var loginRedirects = {
    successRedirect: '/',
    failureRedirect: '/login'
};

var registerRedirects = {
    successRedirect: '/',
    failureRedirect: '/register'
};

module.exports = {
    authenticateUser: authenticateUser,
    authenticateAdmin: authenticateAdmin,
    authenticateUserWithRedirect: authenticateUserWithRedirect,
    authenticateAdminWithRedirect: authenticateAdminWithRedirect,
    loginRedirects: loginRedirects,
    registerRedirects: registerRedirects
};

