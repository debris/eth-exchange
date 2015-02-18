angular.module('eth.Exchange.admin', [
    'ui.router'
]);

angular.module('eth.Exchange.admin').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    
    $stateProvider.state('index', {
        url: '',
        views: {
            main: {
                templateUrl: '/static/admin/controllers/index/index',
                controller: 'IndexCtrl'
            }
        } 
    });    

    $urlRouterProvider.otherwise('');
}]);

