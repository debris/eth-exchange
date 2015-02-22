
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

var onSuccessfullAuth = function (req, res) {
    res.send(200);
};

module.exports = {
    authenticateUser: authenticateUser,
    authenticateWithRedirect: authenticateWithRedirect,
    onSuccessfullAuth: onSuccessfullAuth
};

