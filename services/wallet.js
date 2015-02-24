var Q = require('q');
var contracts = require('./contracts');
var web3 = require('./ethereum/web3');

var watchWalletTransfer = function (wallet, address, value) {
    var deferred = Q.defer();
    // TODO: filter who transfered the money
    wallet.Transfer().changed(function (res) {
        // TODO
        // check transaction count at block here!
        // if transaction count > 1
        // check if transaction was made
        // if yes, resolve else reject
        deferred.resolve();
    });

    return deferred.promise;
};

var watchWalletDeposit = function (wallet, address, value) {
    var deferred = Q.defer();
    // TODO: filter who deposited the money
    wallet.Deposit().changed(function (res) {
        // TODO: same as inside watchWalletTransfer
        deferred.resolve();
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


