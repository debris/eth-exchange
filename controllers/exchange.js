var error = require('../services/error');
var exchange = require('../services/exchange');

var address = function (req, res, next) {
    return exchange.wallet().then(function (wallet) {
        res.send(200, wallet.address);
    }, error(res)).done();
};

module.exports = {
    address: address
};

