/**
 * Exchange coldwallets
 */
angular.module('eth.Exchange.admin').service('coldwallets', ['$http', function ($http) {

    var all = function () {
        return $http.get('/api/admin/coldwallets');
    };

    var create = function (cw) {
        return $http.post('/api/admin/coldwallets', cw);
    };

    var update = function (cw) {
        return $http.post('/api/admin/coldwallets/' + cw._id, cw);
    };

    return {
        all: all,
        create: create,
        update: update
    };
}]);

