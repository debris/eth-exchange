/**
 *  Displays account information
 */
angular.module('eth.Exchange.app').controller('AccountCtrl', ['$scope', 'accounts', 'currentUser', 'web3', function ($scope, accounts, currentUser, web3) {
   
    $scope.account = {}; 

    currentUser.get().success(function (user) {
        $scope.account.user = user;
        if (user.wallet.address)
            $scope.account.hotwalletBalance = web3.toDecimal(web3.eth.balanceAt(user.wallet.address)) || "0";
    });

    $scope.account.accounts = accounts();
}]);

