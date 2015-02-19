angular.module('eth.Exchange.app').controller('DepositCtrl', ['$scope', '$state', 'users', 'accounts', function ($scope, $state, users, accounts) {
    $scope.deposit = {};
    $scope.deposit.accounts = accounts();

    $scope.confirm = function () {
        // logic to deposit value goes here!  
        console.log('deposited ' + $scope.deposit.value + ' Wei')
        $state.go('index.thanks');
    };
}]);

