angular.module('eth.Exchange.app').controller('HistoryCtrl', ['$scope', 'receipts', function ($scope, receipts) {
    $scope.history = {};
    $scope.predicate = '-date';

    receipts.list().success(function (receipts) {
        $scope.history.receipts = receipts;
    });
}]);

