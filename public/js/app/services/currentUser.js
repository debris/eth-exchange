/**
 * currentUser service
 * Depends on localStorage, users
 * Should be used to get/set identity of current user or to get currentUser
 */
angular.module('eth.Exchange.app').service('currentUser', ['localStorage', 'users', function (localStorage, users) {
    
    var getIdentity = function () {
        return localStorage.identity;
    };

    var setIdentity = function (identity) {
        localStorage.identity = identity;
    };

    var get = function () {
        var identity = localStorage.identity;
        return users.getList().then(function (list) {
            return list.filter(function (user) {
                return user.identity == identity;
            })[0];
        });
    };

    return {
        getIdentity: getIdentity,
        setIdentity: setIdentity,
        get: get 
    }; 
}]);

