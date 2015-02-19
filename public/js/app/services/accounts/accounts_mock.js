/**
 * Mock for wrapper around web3.eth.accounts && balance methods
 * Returns fake list of accounts and their balance 
 */
angular.module('eth.Exchange.app').service('accounts', [function () {
    return function () {
        return [{
            address: '0x012312312312',
            balance: 31231231231
        }, {
            address: '0x01231231231232',
            balance: 123123
        }];
    };
}]);

