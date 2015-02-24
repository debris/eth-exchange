/**
 * WithdrawCtrl enables user to withdraw money from exchange
 */
angular.module('eth.Exchange.app').controller('WithdrawCtrl', [
    '$scope', '$q', '$state', 'web3', 'contracts', 'accounts', 'currentUser', function ($scope, $q, $state, web3, contracts, accounts, currentUser) {
   
    $scope.withdraw = {};
    $scope.withdraw.accounts = accounts();

    var validateSelectedAddress = function (selected) {
        if (!selected || !selected.address)
            throw new Error('no address selected!');
    };

    var getUser = function () {
        return currentUser.get().then(function (user) {
            return user.data;
        });
    };

    // TODO: verify if we have account == user.wallet.owner

    var doWithdraw = function (user) {
        // this should be abstracted! every wallet has the same generic api!
        return contracts.get(user.wallet.name).then(function (data) {
            var contract = web3.eth.contract(user.wallet.address, data.data.interface);
            contract.transact({from: user.wallet.owner, value: 0}).transfer($scope.withdraw.selected.address, $scope.withdraw.value);
        });
    };

    var redirect = function () {
        console.log('withdrawn ' + $scope.withdraw.value + ' Wei');
        $state.go('index.thanks');
    };

    $scope.confirm = function () {
        $q.when($scope.withdraw.selected)
            .then(validateSelectedAddress)
            .then(getUser)
            .then(doWithdraw)
            .then(redirect);
    };
    

}]);
