var exchange = require('../services/exchange');
var error = require('../services/error');

var address = function (req, res, next) {
    exchange.get().then(function (exchange) {
        res.send(200, exchange.address);
    }, error(res));
};

module.exports = {
    address: address
};

