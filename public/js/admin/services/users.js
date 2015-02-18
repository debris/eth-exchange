angular.module('eth.Exchange.admin').service('users', [function () {
    var getAll = function () {
        return [
            { name: 'Marek', identity: 0 },
            { name: 'Adam', identity: 1 }
        ];
    };

    var get = function (id) {
        return getAll().filter(function (user) {
            return user.identity === id;
        })[0];
    };

    return {
        getAll: getAll,
        get: get
    };
}]);

