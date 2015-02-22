/**
 * This service should be called to logout user
 */
angular.module('eth.Exchange.utils').service('logout', ['$http', function ($http) {
    return function () {
        return $http.post('/auth/logout');
    };
}]);

