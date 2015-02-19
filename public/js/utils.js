angular.module('eth.Exchange.utils', [
    'restangular',
    'eth.Exchange.utils'
]);

angular.module('eth.Exchange.utils').config(['RestangularProvider', function (RestangularProvider) {
    RestangularProvider.setBaseUrl('api');
    RestangularProvider.setMethodOverriders(['put']);
    RestangularProvider.setRestangularFields({
          id: "_id"
    });
}]);
