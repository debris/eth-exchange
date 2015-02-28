angular.module('eth.Exchange.admin').controller('ReceiptsCtrl', ['$scope', 'receipts', function ($scope, receipts) {
    receipts.all().success(function (receipts) {
        $scope.receipts = receipts;
    });

    // TODO: handle error!
    $scope.accept = function (receipt) {
        receipts.accept(receipt._id).then(function () {
            receipt.state = 'accepted';
        });
    };
}]);

