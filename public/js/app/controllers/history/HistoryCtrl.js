angular.module('eth.Exchange.app').controller('HistoryCtrl', ['$scope', 'operations', function ($scope, operations) {
    $scope.history = {};
    $scope.predicate = '-date';

    operations.list().success(function (operations) {
        $scope.history.operations = operations;
    });
}]);

