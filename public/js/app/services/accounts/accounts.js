/**
 * Tiny wrapper around web3.eth.accounts && balance method
 * Returns current user accounts and their balance
 */
angular.module('eth.Exchange.app').service('accounts', ['web3', function (web3) {
    return function () {
        return web3.eth.accounts.map(function (address) {
            return {
                address: address,
                // TODO dont use web3.toDecimal here
                // etheruem.js should use BigNumbers
                balance: web3.toDecimal(web3.eth.balanceAt(address))
            };
        });
    };
}]);

