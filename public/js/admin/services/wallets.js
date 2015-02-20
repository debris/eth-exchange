angular.module('eth.Exchange.admin').factory('wallets', ['Restangular', function (Restangular) {
    // based on
    // https://github.com/mgonto/restangular#decoupled-restangular-service
    return Restangular.service('wallets');
}]);

