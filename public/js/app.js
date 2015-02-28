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
    
    $stateProvider.state('index.hotwallet', {
        url: '/hotwallet',
        views: {
            content: {
                templateUrl: '/static/app/controllers/hotwallet/hotwallet',
                controller: 'HotwalletCtrl'
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
                controller: 'WithdrawCtrl'
            }
        }
    });

    $stateProvider.state('index.buy', {
        url: '/buy',
        views: {
            content: {
                templateUrl: '/static/app/controllers/buy/buy',
                controller: 'BuyCtrl'
            }
        }
    });

    $stateProvider.state('index.sell', {
        url: '/sell',
        views: {
            content: {
                templateUrl: '/static/app/controllers/sell/sell',
                controller: 'SellCtrl'
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

    $urlRouterProvider.when('', '/account');
    $urlRouterProvider.otherwise('/account');
}]);

