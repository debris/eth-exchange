angular.module('eth.Exchange.admin').controller('UpdateUserCtrl', ['$scope', '$stateParams', '$state', 'users', function ($scope, $stateParams, $state, users) {

    // fix user referene
    $scope.update = {};

    var create = $stateParams.create === true || $stateParams.create === 'true';

    if (create) {
        $scope.update.user = {};
        
        $scope.save = function () {
            users.post($scope.update.user).then(function () {
                $state.go('index.users');
            });
        };

    } else {
        users.one('_id').one($stateParams.id).get().then(function (user) {
            $scope.update.user = user;
        });

        $scope.save = function () {
            // OK
            users.one('_id').post($scope.update.user._id, $scope.update.user).then(function () {
                $state.go('index.users');
            });
        };
    }

}]);

