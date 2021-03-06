var exchange = require('../services/exchange');
var interface = require('../services/interface');
var block = require('../services/block');
var recipient = require('../services/recipient');

var setup = function () {
    exchange.setup()
        .then(block.setup)
        .then(interface.setup)
        .then(recipient.setupWatches)
        .catch(function (err) {
            console.error('exchange setup error');
            console.error('tearing down');
            throw err;
        }).done();
};

module.exports = {
    setup: setup
};

