var fs = require('fs');
var path = require('path');
var Q = require('q');
var web3 = require('./ethereum/web3');

/**
 * This file should be used to interact with contracts
 */

var load = function (file) {
    return Q.ninvoke(fs, 'readFile', path.join(path.dirname(__dirname), 'shared', 'solidity', file + '.sol')).then(function (data) {
        return data.toString();
    });
};

var compile = function (code) {
    return web3.eth.solidity(code);
};

var create = function (compiledCode) {
    return web3.eth.transact({data: compiledCode});
};

var createNewContract = function (name) {
    return load(name)
        .then(compile)
        .then(create);
};

var abi = function (name) {
    return require('../shared/solidity/' + name + '.abi.js');
};

var loadInterface = function (address, name) {
    web3.eth.contract(address, abi(name));
};

module.exports = {
    createNewContract: createNewContract,
    loadInterface: loadInterface 
};

