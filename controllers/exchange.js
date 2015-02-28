var exchange = require('../services/exchange');
var error = require('../services/error');

var address = function (req, res, next) {
    exchange.get().then(function (exchange) {
        res.send(200, exchange.address);
    }, error(res)).done();
};

var get = function (req, res, next) {
    exchange.get().then(function (exchange) {
        res.send(200, exchange);
    }, error(res)).done();
};

module.exports = {
    address: address,
    get: get
};

