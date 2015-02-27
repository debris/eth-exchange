var Q = require('q');
var config = require('../config/config');
var exchange = require('./exchange');
var contracts = require('./contracts');

var interface = null;

var setup = function () {
    return exchange.get().then(function (ex) {
        return contracts.getInterface(ex.address, config.contract);
    }).then(function (contract) {
        interface = contract;
    });
};

var get = function () {
    return Q(interface);
};

module.exports = {
    get: get,
    setup: setup
};

