/**
 * Should be used to get list of user receipts
 */
angular.module('eth.Exchange.app').service('receipts', ['$http', function ($http) {

    var list = function () {
        return $http.get('/api/receipts');
    };

    return {
        list: list 
    };
}]);

