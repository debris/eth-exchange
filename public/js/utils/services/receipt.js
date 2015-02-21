/**
 * This module loads ClientReceipt's contract abi && provides an easy way to interact with this contract
 * Returns contract object
 */
angular.module('eth.Exchange.utils').service('receipt', ['web3', function (web3) {
    var receipt = ClientReceipt; 
    return function (address) {
        return web3.eth.contract(address, receipt);
    };
}]);

