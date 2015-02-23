var Q = require('q');
var Wallet = require('../models/wallet');

var wallet = function () {
    return Q.ninvoke(Wallet, 'findOne', {}); 
};

module.exports = {
    wallet: wallet 
};

