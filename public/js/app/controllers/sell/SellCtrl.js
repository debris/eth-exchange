/**
 * Provides a way to sell assets to exchange
 */
angular.module('eth.Exchange.app').controller('SellCtrl', [
    '$scope', '$q', '$state', 'currentUser', 'assets', function ($scope, $q, $state, currentUser, assets) {

    $scope.sell = {};
    $scope.sell.number = 0;

    assets.price().success(function (price) {
        $scope.sell.price = price;
    });

    currentUser.get().success(function (user) {
        $scope.sell.user = user;
    });

    var verifyNumber = function () {
        return $q.when($scope.sell.number).then(function (number) {
            if (!number || parseInt(number) == 0)
                throw new Error ('you cant sell nothing!');
            if (number > $scope.sell.user.assets) 
                throw  new Error('you cant sell more assets that you have');    
            return number;
        });
    };

    var sellAssets = function () {
        return assets.sell($scope.sell.number);
    };

    var redirect = function () {
        console.log('sold ' + $scope.sell.number + 'assets');
        $state.go('index.thanks');
    };

    $scope.confirm = function () {
        verifyNumber()
            .then(sellAssets)
            .then(redirect)
    };

}]);

