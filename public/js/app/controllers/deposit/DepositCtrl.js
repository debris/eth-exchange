/**
 * DepositCtrl enables user to deposit his money on his exchange wallet
 */
angular.module('eth.Exchange.app').controller('DepositCtrl', [
    '$scope', '$q', '$state', 'web3', 'contracts', 'accounts', 'currentUser', 'exchange', function ($scope, $q, $state, web3, contracts, accounts, currentUser, exchange) {
    $scope.deposit = {};
    $scope.deposit.accounts = accounts();

    var validateSelectedAddress = function () {
        return $q.when($scope.deposit.selected).then(function (selected) {
            if (!selected || !selected.address)
                throw new Error('no address selected!');
            // TODO: dont use parseInt here, use BigNumber instead
            if (selected.balance < $scope.deposit.value)
                throw new Error('not enought funds!');
        });
    };
    
    var getStuff = function () {
        return $q.all([currentUser.get(), exchange.getAddress()]);
    };

    var doDeposit = function (arr) {
        var user = arr[0].data;
        var address = arr[1].data;
        // this should be abstracted! every wallet has the same generic api!
        return contracts.getInterface().then(function (data) {
            var contract = web3.eth.contract(data.data);
            var c = new contract(address);
            c.sendTransaction({
                from: $scope.deposit.selected.address,
                value: $scope.deposit.value
            }).deposit('0x' + user.identity);
        });
    };

    var redirect = function () {
        console.log('deposited ' + $scope.deposit.value + ' Wei')
        $state.go('index.thanks');
    };

    $scope.confirm = function () {
        validateSelectedAddress()
            .then(getStuff)
            .then(doDeposit)
            .then(redirect);
    };
}]);

