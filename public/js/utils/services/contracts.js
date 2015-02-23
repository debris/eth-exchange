/**
 * Provides contracts info
 */
angular.module('eth.Exchange.utils').service('contracts', ['$http', function ($http) {

    var list = function () {
        return $http.get('/api/contracts');
    };

    var get = function (name) {
        return $http.get('/api/contracts/' + name); 
    };

    return {
        list: list,
        get: get
    };
}]);

