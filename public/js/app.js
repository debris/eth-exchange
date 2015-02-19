angular.module('eth.Exchange.app', [
    'ui.router',
    'restangular',
    'eth.Exchange.utils'
]);

angular.module('eth.Exchange.app').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    
    $stateProvider.state('index', {
        url: '',
        views: {
            main: {
                templateUrl: '/static/app/controllers/index/index',
                controller: 'IndexCtrl'
            }
        } 
    }); 

    $stateProvider.state('index.account', {
        url: '/account',
        views: {
            content: {
                templateUrl: '/static/app/controllers/account/account',
                controller: 'AccountCtrl'
            }
        }
    });

    $stateProvider.state('index.deposit', {
        url: '/deposit',
        views: {
            content: {
                templateUrl: '/static/app/controllers/deposit/deposit',
                controller: 'DepositCtrl'
            }
        }
    });

    $stateProvider.state('index.withdraw', {
        url: '/withdraw',
        views: {
            content: {
                templateUrl: '/static/app/controllers/withdraw/withdraw',
                contorller: 'WithdrawCtrl'
            }
        }
    });

    $urlRouterProvider.otherwise('');
}]);

