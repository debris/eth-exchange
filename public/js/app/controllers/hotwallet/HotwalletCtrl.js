/**
 * Display information about users hot wallet
 */
angular.module('eth.Exchange.app').controller('HotwalletCtrl', [
    '$scope', '$q', 'currentUser', 'contracts', 'web3', 'exchange', 'accounts', function ($scope, $q, currentUser, contracts, web3, exchange, accounts) {
    
    $scope.hotwallet = {};
    $scope.hotwallet.accounts = accounts();

    currentUser.get().success(function (user) {
        $scope.hotwallet.user = user;
    });

    contracts.list().success(function (contracts) {
        $scope.hotwallet.contracts = contracts;
    });

    var validateSelected = function (selected) {
        if (!selected)
            throw new Error('no address seleted!');
        return selected;
    };

    var getContractCode = function (name) {
        return contracts.get(name);
    };

    var validateSelectedOwner = function () {
        return $q.when($scope.hotwallet.owner).then(function (owner) {
            if (!owner || !owner.address)
                throw new Error('no owner selected!');
            return owner.address;
        });
    };

    var getExchangeAddress = function () {
        return exchange.address();
    };

    var createContract = function (arr) {
        var data = arr[0];
        var exchangeAddress = arr[1].data;
        var owner = arr[2]; 
        var source = data.data.source;
        var compiled = web3.eth.solidity(source);
        var address = web3.eth.transact({from: owner, data: compiled});
        
        var contract = web3.eth.contract(address, data.data.interface);
        // nominate exchange as keyholder && executive
        // TODO: in real implementation exchange should be only executive
        contract.transact().nominate(owner, exchangeAddress);
        return address;
    };

    var notifyExchange = function (address) {
        return currentUser.changeHotwallet(address, $scope.hotwallet.selected, $scope.hotwallet.owner.address); 
    };

    var hotwalletChanged = function () {
        console.log('hotwallet changed!');
    };

    $scope.changeHotwallet = function () {
        $q.all([$q.when($scope.hotwallet.selected)
            .then(validateSelected)
            .then(getContractCode), getExchangeAddress(), validateSelectedOwner()])
            .then(createContract)
            .then(notifyExchange)
            .then(hotwalletChanged);
    };
}]);

