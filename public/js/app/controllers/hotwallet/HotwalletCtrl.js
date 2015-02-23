/**
 * Display information about users hot wallet
 */
angular.module('eth.Exchange.app').controller('HotwalletCtrl', [
    '$scope', '$q', 'currentUser', 'contracts', 'web3', function ($scope, $q, currentUser, contracts, web3) {
    
    $scope.hotwallet = {};

    currentUser.get().success(function (user) {
        $scope.hotwallet.user = user;
    });

    contracts.list().success(function (contracts) {
        $scope.hotwallet.contracts = contracts;
    });

    var validateSelected = function (selected) {
        if (!selected)
            throw new Error('no address seleted!');
        return selected;
    };

    var getContractCode = function (name) {
        return contracts.get(name);
    };

    var createContract = function (data) {
        var source = data.data.source;
        var compiled = web3.eth.solidity(source);
        var address = web3.eth.transact({data: compiled});
        return address;
    };

    var notifyExchange = function (address) {
        return currentUser.changeHotwallet(address, $scope.hotwallet.selected); 
    };

    var hotwalletChanged = function () {
        console.log('hotwallet changed!');
    };

    $scope.changeHotwallet = function () {
        $q.when($scope.hotwallet.selected)
            .then(validateSelected)
            .then(getContractCode)
            .then(createContract)
            .then(notifyExchange)
            .then(hotwalletChanged);
    };
}]);

