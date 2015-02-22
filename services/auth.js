
var authenticateUser = function (req, res, next) {
    if (!req.user) {
        return res.send(401);
    }
    next();
};

var authenticateWithRedirect = function (req, res, next) {
    if (!req.user) {
        return res.redirect('/login');
    }
    next();
};

module.exports = {
    authenticateUser: authenticateUser,
    authenticateWithRedirect: authenticateWithRedirect
};

