var BigNumber = require('bignumber.js');
var config = require('../config/config');
var error = require('../services/error');
var exchange = require('../services/exchange');
var web3 = require('../services/ethereum/web3');
var W = require('../services/wallet');

var verifyWallet = function (wallet, number) {
    if (!wallet) {
        console.error('couldnt find wallet');
        throw new Error('internal server error');
    }
    return wallet;
};

var verifyWalletBalance = function (wallet, price) {
    var balance = web3.eth.balanceAt(wallet.address); 
    var balance = balanec.length > 2 ? balance.substr(2) : "0";
    // TODO: make all calculations on bignumbers
    var diff = new BigNumber(balance, 16).minus(price);
    if (diff.lessThan(0)) {
        console.log('not enough funds!');
        throw new Error('internal server error');
    }
    return wallet;
};

var price = function (req, res, next) {
    res.send(200, config.assetsPrice);
};

var buy = function (req, res, next) {
    var number = req.body.number;
    var price = config.assetsPrice * number;
    exchange.wallet()
        .then(verifyWallet)
        .then(function (wallet) {
            res.send(200); // transaction is pending
            return wallet;
        }, error(res))
        .then(function (wallet) {
            return W.transferFromWallet(req.user.wallet, wallet.address, price);
        })
        .then(function () {
            console.log('transaction successfull'); // mark transaction as successfull here
        })
        .catch(function (err) {
            console.log('transaction failed'); // mark transaction as failed here
        })
        .done();

};

var sell = function (req, res, next) {
    // TODO: verify users assets, if he has enought
    var number = req.body.number;
    var price = config.assetsPrice * number;
    exchange.wallet()
        .then(verifyWallet)
        .then(function (wallet) {
            return verifyWalletBalance(wallet, price);
        })
        .then(function (wallet) {
            res.send(200); // transaction is pending
            return wallet;
        }, error(res))
        .then(function (wallet) {
            return W.transferToWallet(req.user.wallet, wallet.address, price); 
        })
        .then(function () {
            console.log('transaction successfull'); // mark transaction as successfull here;
        })
        .catch(function (err) {
            console.log('transaction failed'); // mark transaction as failed here
        })
        .done();
};

module.exports = {
    price: price,
    buy: buy,
    sell: sell
};


