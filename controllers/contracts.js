var Q = require('q');
var contracts = require('../services/contracts');
var error = require('../services/error');

var list = function (req, res, next) {
    contract.list().then(function (list) {
        res.send(200, list); 
    }, error).done();
};

var get = function (req, res, next) {
    var name = req.params.name;
    Q.all([contracts.loadContract(name), contracts.loadInterface(name)]).then(function (arr) {
        res.send(200, {
            contract: arr[0],
            interface: arr[1]
        });
    }, error).done();
};

module.exports = {
    list: list,
    get: get
};

