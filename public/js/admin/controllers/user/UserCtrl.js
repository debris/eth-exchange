angular.module('eth.Exchange.admin').controller('UserCtrl', ['$scope', '$stateParams', 'users', function ($scope, $stateParams, users) {

    // fix user reference
    $scope.current = {};

    users.one('_id').one($stateParams.id).get().then(function (user) {
        $scope.current.user = user;
    });
}]);

