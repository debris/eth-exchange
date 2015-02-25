var Q = require('q');
var contracts = require('./contracts');
var web3 = require('./ethereum/web3');

var watchWalletTransfer = function (wallet, address, value) {
    var deferred = Q.defer();
    var number = web3.eth.number + 1;
    // TODO: filter who transfered the money
    var watch = wallet.Transfer();
    watch.changed(function (res) {
        // reject after some timeout 
        // (number + 1).should.be.equal.to(res.number)
        if (res.args._value && res.args._value.equals(value) && number <= res.number) {
            // TODO
            // check transaction count at block here!
            // if transaction count > 1
            // check web3.eth.transaction
            var count = web3.eth.transactionCount(res.number);

            deferred.resolve();
            watch.uninstall();
        } 
    });

    return deferred.promise;
};

var watchWalletDeposit = function (wallet, address, value) {
    var deferred = Q.defer();
    // TODO: filter who deposited the money
    var number = web3.eth.number + 1;
    // TODO: filter who transfered the money
    var watch = wallet.AnonymousDeposit();
    watch.changed(function (res) {
        // TODO: same as inside watchWalletTransfer
        
        // reject after some timeout 
        // (number + 1).should.be.equal.to(res.number)
        if (res.args._value && res.args._value.equals(value) && number <= res.number) {
            // TODO
            // check transaction count at block here!
            // if transaction count > 1
            // check web3.eth.transaction
            var count = web3.eth.transactionCount(res.number);


            deferred.resolve();
            watch.uninstall();
        }
    });

    return deferred.promise;
};

var transferFromWallet = function (userWallet, to, value) {
    // TODO: instead of using ClientReceipt abi, use an abstract abi
    return contracts.getInterface(userWallet.address, userWallet.name).then(function (wallet) {
        var watch = watchWalletTransfer(wallet, to, value);
        wallet.transact().transfer(to, value);
        return watch; 
    });
};

var transferToWallet = function (userWallet, from, value) {
    return contracts.getInterface(userWallet.address, userWallet.name).then(function (wallet) {
        var watch = watchWalletDeposit(wallet, from, value);
        web3.eth.transact({from: from, to: userWallet.address, value: value});
        return watch;
    });
};

module.exports = {
    transferFromWallet: transferFromWallet,
    transferToWallet: transferToWallet
};


