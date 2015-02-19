angular.module('eth.Exchange.utils').factory('users', ['Restangular', function (Restangular) {
    // based on
    // https://github.com/mgonto/restangular#decoupled-restangular-service
    return Restangular.service('users');
}]);

