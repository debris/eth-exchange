var fs = require('fs');
var path = require('path');
var Q = require('q');
var web3 = require('./ethereum/web3');

var load = function (file) {
    return Q.ninvoke(fs, 'readFile', path.join(path.dirname(__dirname), 'solidity', file)).then(function (data) {
        return data.toString();
    });
};

var compile = function (code) {
    return web3.eth.solidity(code);
};

var create = function (compiledCode) {
    return web3.eth.transact({data: compiledCode});
};

var newContract = function (name) {
    return load(name)
        .then(compile)
        .then(create);
};

module.exports = {
    newContract: newContract 
};

