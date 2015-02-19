angular.module('eth.Exchange.utils').service('web3', [function () {
    // return ethereum.js module
    var web3 = require('web3');
    web3.setProvider(new web3.providers.HttpSyncProvider());
    return web3;
}]);

