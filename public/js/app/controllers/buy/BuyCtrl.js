/**
 * Provides a way to buy assets to exchange
 */
angular.module('eth.Exchange.app').controller('BuyCtrl', [
    '$scope', '$q', '$state', 'currentUser', 'web3', 'assets', function ($scope, $q, $state, currentUser, web3, assets) {
    $scope.buy = {};
    $scope.buy.number = 0;

    assets.price().success(function (price) {
        $scope.buy.price = price;
    });

    currentUser.get().success(function (user) {
        $scope.buy.user = user;
        $scope.buy.funds = web3.toDecimal(web3.eth.balanceAt(user.wallet.address));
    });

    var verifyNumber = function () {
        return $q.when($scope.buy.number).then(function (number) {
            // TODO use bignumber here?1
            if (!number || parseInt(number) == 0)
                throw new Error ('you cant buy nothing!');
            return number;
        });
    };

    var buyAssets = function () {
        return assets.buy($scope.buy.number);
    };

    var redirect = function () {
        console.log('bought ' + $scope.buy.number +  'assets');
        $state.go('index.thanks');
    };

    $scope.confirm = function () {
        verifyNumber()
            .then(buyAssets)
            .then(redirect);
    };

}]);

