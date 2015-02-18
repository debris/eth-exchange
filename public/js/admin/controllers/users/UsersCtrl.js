angular.module('eth.Exchange.admin').controller('UsersCtrl', ['$scope', 'users', function ($scope, users) {
    $scope.users = users.getAll(); 
}]);

