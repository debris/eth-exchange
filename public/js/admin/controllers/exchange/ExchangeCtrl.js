angular.module('eth.Exchange.admin').controller('ExchangeCtrl', ['$scope', 'exchange', function ($scope, exchange) {
    exchange.get().success(function (exchange) {
        $scope.exchange = exchange;
    }); 
}]);

