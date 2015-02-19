/**
 *  Displays account information
 *  To simplify poc, enables user to change account
 *  Current account identity is stored in localstorage
 */
angular.module('eth.Exchange.app').controller('AccountCtrl', ['$scope', 'users', 'accounts', function ($scope, users, accounts) {
   
    $scope.account = {}; 

    users.getList().then(function (users) {
        $scope.account.users = users;
        var identity = localStorage.identity;
        $scope.account.user = users.filter(function (user) {
            return user.identity == identity;
        })[0];
    });
   
    $scope.$watch('account.user', function () {
        if (!$scope.account.user) {
            return;
        }

        localStorage.identity = $scope.account.user.identity;
    });

    $scope.account.accounts = accounts();
}]);

