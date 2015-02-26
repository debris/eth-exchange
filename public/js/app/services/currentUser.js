/**
 * currentUser service
 * Depends on localStorage, users
 * Should be used to get/set identity of current user or to get currentUser
 */
angular.module('eth.Exchange.app').service('currentUser', ['$http', function ($http) {
    
    var get = function () {
        return $http.get('/api/user');
    };

    return {
        get: get
    }; 
}]);

