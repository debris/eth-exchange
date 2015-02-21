/**
 * DepositCtrl enables user to deposit his money on his exchange wallet
 */
angular.module('eth.Exchange.app').controller('DepositCtrl', [
    '$scope', '$q', '$state', 'web3', 'receipt', 'accounts', 'currentUser', function ($scope, $q, $state, web3, receipt, accounts, currentUser) {
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
            if (!user)
                throw new Error('user not logged in!');
            return user;
        });
    };

    var doDeposit = function (user) {
        var ClientReceipt = receipt(user.address);
        return ClientReceipt.transact({
            from: $scope.deposit.selected.address,
            value: $scope.deposit.value
        }).deposit($scope.deposit.selected.address);
        // TODO: should be:
        //}).deposit(user.identity);
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

