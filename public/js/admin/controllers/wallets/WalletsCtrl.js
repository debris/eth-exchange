angular.module('eth.Exchange.admin').controller('WalletsCtrl', ['$scope', 'wallets', function ($scope, wallets) {
    wallets.getList().then(function (wallets) {
        $scope.wallets = wallets;
    }); 
}]);

