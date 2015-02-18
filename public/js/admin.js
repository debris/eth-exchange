angular.module('eth.Exchange.admin', [
    'ui.router',
    'restangular'
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

    $stateProvider.state('index.users', {
        url: '/users',
        views: {
            content: {
                templateUrl: '/static/admin/controllers/users/users.jade',
                controller: 'UsersCtrl'
            }
        }
    });

    $stateProvider.state('index.user', {
        url: '/user/:id',
        views: {
            content: {
                templateUrl: '/static/admin/controllers/user/user.jade',
                controller: 'UserCtrl'
            }
        }
    });

    $stateProvider.state('index.settings', {
        url: '/settings',
        views: {
            content: {
                templateUrl: '/static/admin/controllers/settings/settings.jade',
                controller: 'SettingsCtrl'
            }
        }
    });

    $stateProvider.state('index.updateUser', {
        url: '/updateUser/:create/:id',
        views: {
            content: {
                templateUrl: '/static/admin/controllers/user/update.jade',
                controller: 'UpdateUserCtrl'
            }
        }
    });

    $urlRouterProvider.otherwise('');
}]);

angular.module('eth.Exchange.admin').config(['RestangularProvider', function (RestangularProvider) {
    RestangularProvider.setBaseUrl('api/admin');
    RestangularProvider.setMethodOverriders(['put']);
}]);

