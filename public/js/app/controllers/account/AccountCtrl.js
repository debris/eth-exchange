/**
 *  Displays account information
 */
angular.module('eth.Exchange.app').controller('AccountCtrl', ['$scope', 'accounts', 'currentUser', function ($scope, accounts, currentUser) {
   
    $scope.account = {}; 

    currentUser.get().success(function (user) {
        $scope.account.user = user;
    });

    $scope.account.accounts = accounts();
}]);

