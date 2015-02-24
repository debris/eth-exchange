/**
 * Should be used to get price, buy and sell assets.
 */
angular.module('eth.Exchange.utils').service('assets', ['$http', function ($http) {

    var price = function () {
        return $http.get('/api/assets/price');
    };

    var buy = function (number) {
        return $http.post('/api/assets/buy', {
            number: number
        });
    };

    var sell = function (number) {
        return $http.post('/api/assets/sell', {
            number: number
        });
    };

    return {
        price: price,
        buy: buy,
        sell: sell
    };
}]);

