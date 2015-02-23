var fs = require('fs');
var path = require('path');
var Q = require('q');
var glob = require('glob');
var web3 = require('./ethereum/web3');

/**
 * This file should be used to interact with contracts
 */

var solidityPath = path.join(path.dirname(__dirname), 'shared', 'solidity');

var toContractPath = function (name) {
    return path.join(solidityPath, name + '.sol');
}; 

var toInterfacePath = function (name) {
    return path.join(solidityPath, name + '.json');
};

var load = function (filename) {
    return Q.ninvoke(fs, 'readFile', filename).then(function (data) {
        return data.toString();
    });
};

var loadContract = function (name) {
    return load(toContractPath(name));
};

var loadInterface = function (name) {
    return load(toInterfacePath(name)).then(function (string) {
        return JSON.parse(string);
    });
}

var compile = function (code) {
    return web3.eth.solidity(code);
};

var create = function (compiledCode) {
    return web3.eth.transact({data: compiledCode});
};

var createNewContract = function (name) {
    return loadContract(name)
        .then(compile)
        .then(create);
};

var getInterface = function (address, name) {
    loadInterface(name).then(function (interface) {
        return web3.eth.contract(address, abi(name));
    });
};

var list = function () {
    return Q.nfcall(glob, solidityPath + '/*.sol').then(function (list) {
        return list.map(function (element) {
            return element.substr(0, element.length - 4).substr(element.indexOf('solidity/') + 9)
        });
    });
};

module.exports = {
    list: list,
    loadContract: loadContract,
    loadInterface: loadInterface,
    createNewContract: createNewContract,
    getInterface: getInterface 
};

