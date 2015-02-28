/**
 * Should be used to get list of user receipts
 */
angular.module('eth.Exchange.utils').service('receipts', ['$http', function ($http) {

    var list = function () {
        return $http.get('/api/receipts');
    };

    var withdraw = function (value, to) {
        return $http.post('/api/receipts/withdraw', {
            value: value,
            to: to
        });
    };

    var accept = function (id) {
        return $http.post('/api/admin/receipts/accept', {
            _id: id
        });
    };

    var all = function () {
        return $http.get('/api/admin/receipts');
    };

    return {
        all: all,
        list: list,
        withdraw: withdraw,
        accept: accept
    };
}]);

