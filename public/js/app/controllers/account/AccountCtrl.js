angular.module('eth.Exchange.app').controller('AccountCtrl', ['$scope', 'users', 'web3', function ($scope, users, web3) {
   
    $scope.account = {}; 
   
    // temprary
    $scope.account.identity = localStorage.identity;

    var reloadAccount = function () {
        users.one('identity').one($scope.account.identity).get().then(function (user) {
            $scope.account.user = user;
        }); 
    };

    reloadAccount();

    $scope.changeAccount = function () {
        localStorage.identity = $scope.account.identity;
        reloadAccount();
    };

    $scope.account.accounts = web3.eth.accounts.map(function (address) {
        return {
            address: address,
            balance: web3.toDecimal(web3.eth.balanceAt(address))
        };
    });
}]);

