var Q = require('q');
var contracts = require('../services/contracts');
var error = require('../services/error');

var list = function (req, res, next) {
    contracts.list().then(function (list) {
        res.send(200, list); 
    }, error(res)).done();
};

var get = function (req, res, next) {
    var name = req.params.name;
    Q.all([contracts.loadContract(name), contracts.loadInterface(name)]).then(function (arr) {
        res.send(200, {
            source: arr[0],
            interface: arr[1]
        });
    }, error(res)).done();
};

module.exports = {
    list: list,
    get: get
};

