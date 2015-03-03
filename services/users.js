var Q = require('q');
var User = require('../models/user');

var increaseUserBalance = function (identity, value) {
    return Q.ninvoke(User, 'findOneAndUpdate', {
        identity: identity
    }, {
        $inc: {
            balance: value,
            availableBalance: value
        }
    });
};

var decreaseUserBalance = function (identity, value) {
    return increaseUserBalance(identity, -value);
};

var getAdmins = function () {
    return Q.ninvoke(User, 'find', {
        role: 'admin'
    });
};

module.exports = {
    increaseUserBalance: increaseUserBalance,
    decreaseUserBalance: decreaseUserBalance,
    getAdmins: getAdmins
};

