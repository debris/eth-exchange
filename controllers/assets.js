var Q = require('q');
var BigNumber = require('bignumber.js');
var config = require('../config/config');
var error = require('../services/error');
var exchange = require('../services/exchange');
var web3 = require('../services/ethereum/web3');
var W = require('../services/wallet');
var Operation = require('../models/operation');

var verifyWallet = function (wallet, number) {
    if (!wallet) {
        console.error('couldnt find wallet');
        throw new Error('internal server error');
    }
    return wallet;
};

var verifyWalletBalance = function (wallet, price) {
    var balance = web3.eth.balanceAt(wallet.address); 
    var balance = balance.length > 2 ? balance.substr(2) : "0";
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

// TODO: cache pending transactions somewhere?
var buy = function (req, res, next) {
    var number = req.body.number;
    var price = config.assetsPrice * number;
    exchange.wallet()
        .then(verifyWallet)
        .then(function (wallet) {
            return verifyWalletBalance(wallet, price);
        })
        .then(function (wallet) {
            var operationPromise = Q.ninvoke(Operation, 'create', {
                user: req.user._id,
                type: 'buy',
                state: 'pending',
                assets: number,
                price: price
            });

            res.send(200);
            return Q.all([Q(wallet), operationPromise]);
        }, error(res))
        .then(function (arr) {
            var wallet = arr[0];
            var operation = arr[1];

            return Q.all([W.transferFromWallet(req.user.wallet, wallet.address, price), Q(operation)]);
        })
        .then(function (arr) {
            var operation = arr[1];
            var user = req.user;
            
            // TODO: get user model with mongo, so assets are not overriden
            operation.state = 'finished';
            operation.markModified('state');
            operation.save();
            user.assets += number;
            user.markModified('assets');
            user.save();
        })
        .catch(function (err) {
            console.error('transaction failed'); // mark transaction as failed here
            console.error(err);
        })
        .done();

};

var verifyAssets = function (user, number) {
    if (user.assets < number) {
        throw new Error('not enough assets!');
    }
};

// TODO: group promises niceR!
var sell = function (req, res, next) {
    var number = req.body.number;
    var price = config.assetsPrice * number;
    Q(verifyAssets(req.user, req.user))
        .then(function () {
            return exchange.wallet()
        })
        .then(verifyWallet)
        .then(function (wallet) {
            var operationPromise = Q.ninvoke(Operation, 'create', {
                user: req.user._id,
                type: 'sell',
                state: 'pending',
                assets: number,
                price: price
            });

            res.send(200); // transaction is pending
            return Q.all([Q(wallet), operationPromise]);
        }, error(res))
        .then(function (arr) {
            var wallet = arr[0];
            var operation = arr[1];

            return Q.all([W.transferToWallet(req.user.wallet, wallet.address, price), Q(operation)]);
        })
        .then(function (arr) {
            var operation = arr[1];
            var user = req.user;
            
            // TODO: update user model with raw mongo, so assets are not overriden
            operation.state = 'finished';
            operation.markModified('state');
            operation.save();
            user.assets -= number;
            user.markModified('assets');
            user.save();

            console.log('transaction successfull'); // mark transaction as successfull here;
        })
        .catch(function (err) {
            console.error('transaction failed'); // mark transaction as failed here
        })
        .done();
};

module.exports = {
    price: price,
    buy: buy,
    sell: sell
};


