angular.module('eth.Exchange.admin').controller('UsersCtrl', ['$scope', 'users', function ($scope, users) {
    users.getList().then(function (users) {
        $scope.users = users;
    });
}]);

