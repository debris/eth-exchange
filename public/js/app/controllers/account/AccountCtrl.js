/**
 *  Displays account information
 *  To simplify poc, enables user to change account
 *  Current account identity is stored in localstorage
 */
angular.module('eth.Exchange.app').controller('AccountCtrl', ['$scope', 'users', 'accounts', 'currentUser', 'web3', function ($scope, users, accounts, currentUser, web3) {
   
    $scope.account = {}; 

    users.getList().then(function (users) {
        $scope.account.users = users;
        var identity = currentUser.getIdentity();
        var user = users.filter(function (user) {
            return user.identity == identity;
        })[0];
    
        $scope.account.user = user; 
        if (user && user.address) {
            $scope.account.hotWalletBalance = web3.toDecimal(web3.eth.balanceAt(user.address));
        }
    });
   
    $scope.$watch('account.user', function () {
        if (!$scope.account.user) {
            return;
        }

        currentUser.setIdentity($scope.account.user.identity);
    });

    $scope.account.accounts = accounts();
}]);

