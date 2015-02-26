var exchange = require('../services/exchange');
var recipient = require('../services/recipient');

var setup = function () {
    exchange.setupHotwallet()
        .then(recipient.handleUnhandledEvents)
        .then(recipient.setupWatches);
};

module.exports = {
    setup: setup
};

