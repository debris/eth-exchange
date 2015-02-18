angular.module('eth.Exchange.admin').controller('UserCtrl', ['$scope', '$stateParams', 'users', function ($scope, $stateParams, users) {
    $scope.user = users.get(parseInt($stateParams.id));
}]);

