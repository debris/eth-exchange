/**
 * This module installs web3 object in angular app
 * By default it uses por 8080 to connect to running ethereum node
 */
angular.module('eth.Exchange.utils').service('web3', [function () {
    // return ethereum.js module
    var web3 = require('web3');

    // host is injected from jade template, from config on backend
    web3.setProvider(new web3.providers.HttpSyncProvider());
    return web3;
}]);

