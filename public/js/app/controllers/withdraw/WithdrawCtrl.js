/**
 * WithdrawCtrl enables user to withdraw money from exchange
 */
angular.module('eth.Exchange.app').controller('WithdrawCtrl', [
    '$scope', '$q', '$state', 'accounts', 'currentUser', 'receipts', function ($scope, $q, $state, accounts, currentUser, receipts) {
   
    $scope.withdraw = {};
    $scope.withdraw.accounts = accounts();

    var validateSelectedAddress = function () {
        return $q.when($scope.withdraw.selected).then(function (selected) {
            if (!selected || !selected.address)
                throw new Error('no address selected!');
        });
    };

    var getUser = function () {
        return currentUser.get().then(function (user) {
            return user.data;
        });
    };

    var verifyAmount = function (user) {
        // throw an exception if user do not have enough funds 
    };

    var doWithdraw = function () {
        return receipts.withdraw($scope.withdraw.value, $scope.withdraw.selected.address);
    };

    var redirect = function () {
        console.log('withdrawn ' + $scope.withdraw.value + ' Wei');
        $state.go('index.thanks');
    };

    $scope.confirm = function () {
        validateSelectedAddress()
            .then(getUser)
            .then(verifyAmount)
            .then(doWithdraw)
            .then(redirect);
    };
    

}]);
