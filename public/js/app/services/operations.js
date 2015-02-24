/**
 * Should be used to get list of all operations
 */
angular.module('eth.Exchange.app').service('operations', ['$http', function ($http) {
   
    var list = function () {
        return $http.get('/api/operations');
    }; 

    return {
        list: list
    };

}]);

