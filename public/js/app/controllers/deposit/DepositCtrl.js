/**
 * DepositCtrl enables user to deposit his money on his exchange wallet
 */
angular.module('eth.Exchange.app').controller('DepositCtrl', [
    '$scope', '$q', '$state', 'web3', 'contracts', 'accounts', 'currentUser', function ($scope, $q, $state, web3, contracts, accounts, currentUser) {
    $scope.deposit = {};
    $scope.deposit.accounts = accounts();

    var validateSelectedAddress = function (selected) {
        if (!selected || !selected.address)
            throw new Error('no address selected!');
        // TODO: dont use parseInt here, use BigNumber instead
        if (parseInt(selected.balance) < $scope.deposit.value)
            throw new Error('not enought funds!');
    };
    
    var getUser = function () {
        return currentUser.get().then(function (user) {
            return user.data;
        });
    };

    var doDeposit = function (user) {
        // this should be abstracted! every wallet has the same generic api!
        return contracts.get(user.wallet.name).then(function (data) {
            var contract = web3.eth.contract(user.wallet.address, data.data.interface);
            contract.transact({
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
        $q.when($scope.deposit.selected)
            .then(validateSelectedAddress)
            .then(getUser)
            .then(doDeposit)
            .then(redirect);
    };
}]);

