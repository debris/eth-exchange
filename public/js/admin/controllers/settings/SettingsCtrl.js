angular.module('eth.Exchange.admin').controller('SettingsCtrl', ['$scope', 'exchange', function ($scope, exchange) {
    
    $scope.settings = {};

    exchange.get().success(function (ex) {
        $scope.settings.refill = ex.refill;
        $scope.settings.drain = ex.drain;
    });

    $scope.save = function () {
        exchange.updateThresholds($scope.settings.refill, $scope.settings.drain).then(function () {
            console.log('thresholds updated!');
        });
    };
}]);

