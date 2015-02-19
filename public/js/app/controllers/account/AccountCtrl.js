angular.module('eth.Exchange.app').controller('AccountCtrl', ['$scope', 'users', function ($scope, users) {
   
    $scope.account = {}; 
   
    // temprary
    $scope.account.identity = localStorage.identity;

    var reloadAccount = function () {
        users.one('identity').one($scope.account.identity).get().then(function (user) {
            $scope.account.user = user;
        }); 
    };

    reloadAccount();

    $scope.changeAccount = function () {
        localStorage.identity = $scope.account.identity;
        reloadAccount();
    };
}]);

