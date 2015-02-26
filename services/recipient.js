var Q = require('q');

var onAnonymousDeposit = function (from, value) {

};

var onDeposit = function (from, id, value) {

};

var onRefill = function (from, value) {

};

var onTransfer = function (from, to, value) {

};

var handleUnhandledEvents = function () {
    return Q();
};

var setupWatches = function () {
    return Q();
};

module.exports = {
    onAnonymousDeposit: onAnonymousDeposit,
    onDeposit: onDeposit,
    onRefill: onRefill,
    onTransfer: onTransfer,
    handleUnhandledEvents: handleUnhandledEvents,
    setupWatches: setupWatches
};

