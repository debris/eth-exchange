/**
 * Provides exhange related info
 */
angular.module('eth.Exchange.utils').service('exchange', ['$http', function ($http) {
    
    var getAddress = function () {
        return $http.get('/api/exchange/address');
    };

    var get = function () {
        return $http.get('/api/admin/exchange');
    };

    return {
        get: get,
        getAddress: getAddress
    };

}]);

