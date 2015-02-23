/**
 * currentUser service
 * Depends on localStorage, users
 * Should be used to get/set identity of current user or to get currentUser
 */
angular.module('eth.Exchange.app').service('currentUser', ['$http', function ($http) {
    
    var get = function () {
        return $http.get('/api/user');
    };

    var changeHotwallet = function (address, name) {
        return $http.post('/api/user/setWallet', {
            address: address,
            name: name
        });
    }; 

    return {
        get: get
    }; 
}]);

