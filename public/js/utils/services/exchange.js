/**
 * Provides exhange related info
 */
angular.module('eth.Exchange.utils').service('exchange', ['$http', function ($http) {
    
    var address = function () {
        return $http.get('/api/exchange/address');
    };

    return {
        address: address
    };

}]);

