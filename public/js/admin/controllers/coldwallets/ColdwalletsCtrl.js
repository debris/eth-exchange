angular.module('eth.Exchange.admin').controller('ColdwalletsCtrl', ['$scope', 'coldwallets', function ($scope, coldwallets) {

    $scope.newWallet = {};

    coldwallets.all().success(function (wallets) {
        $scope.coldwallets = wallets;
    });

    $scope.newColdwallet = function () {
        coldwallets.create({
            address: $scope.newWallet.address,
            maxBalance: $scope.newWallet.maxBalance
        });
    };
    
}]);

