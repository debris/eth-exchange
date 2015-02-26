/**
 * Provides contract
 */
angular.module('eth.Exchange.utils').service('contracts', ['$http', function ($http) {

    var getInterface = function () {
        return $http.get('/api/contracts/interface');
    };

    return {
        getInterface: getInterface
    };
}]);

