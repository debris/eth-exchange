var Q = require('q');
var config = require('../config/config');
var contracts = require('../services/contracts');
var error = require('../services/error');

var interface = function (req, res, next) {
        var name = req.params.name;
        contracts.loadInterface(config.contract).then(function (i) {
            res.send(200, i);
        }, error(res)).done();
};

module.exports = {
    interface: interface
};

