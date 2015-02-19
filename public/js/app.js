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

    $stateProvider.state('index.thanks', {
        url: '/thanks',
        views: {
            content: {
                templateUrl: '/static/app/controllers/thanks/thanks'
            }
        }
    });
    
    $stateProvider.state('index.history', {
        url: '/history',
        views: {
            content: {
                templateUrl: '/static/app/controllers/history/history',
                controller: 'HistoryCtrl'
            }
        }
    });

    $urlRouterProvider.otherwise('');
}]);

