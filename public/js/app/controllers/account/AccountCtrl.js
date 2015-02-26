/**
 *  Displays account information
 */
angular.module('eth.Exchange.app').controller('AccountCtrl', ['$scope', 'accounts', 'currentUser', 'web3', function ($scope, accounts, currentUser, web3) {
   
    $scope.account = {}; 

    currentUser.get().success(function (user) {
        $scope.account.user = user;
    });

    $scope.account.accounts = accounts();
}]);

