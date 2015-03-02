var Q = require('q');
var Coldwallet = require('../models/coldwallet');

var increaseColdwalletBalance = function (address, value) {
    return Q.ninvoke(Coldwallet, 'findOneAndUpdate', {
        address: address
    }, {
        $inc: {
            expectedBalance: value
        }
    });
};

var decreaseColdwalletBalance = function (address, value) {
    return increaseColdwalletBalance(address, -value);
};

var getColdwalletForDrain = function () {
    return Q.ninvoke(Coldwallet.findOneAndUpdate({
        $where: function () {
            return this.expectedBalance < this.maxBalance;
        }
    }), 'sort', '-maxBalance');
};

modulel.exports = {
    increaseColdwalletBalance: increaseColdwalletBalance,
    decreaseColdwalletBalance: decreaseColdwalletBalance,
    getColdwalletForDrain: getColdwalletForDrain
};

