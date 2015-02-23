var config = require('../config/config');
var error = require('../services/error');

var price = function (req, res, next) {
    res.send(200, config.assetsPrice);
};

var buy = function (req, res, next) {
    var number = req.body.number;

};

var sell = function (req, res, next) {
    var number = req.body.number;
};

module.exports = {
    price: price,
    buy: buy,
    sell: sell
};


