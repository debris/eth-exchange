angular.module('eth.Exchange.app').controller('IndexCtrl', ['$scope', '$window', 'logout', function ($scope, $window, logout) {
    $scope.logout = function () {
        logout();
        $window.location.reload();
    }; 
}]);

