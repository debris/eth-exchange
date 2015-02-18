var ClientReceipt = function () {
    return [{
        name: 'open',
        type: 'function',
        inputs: [],
        outputs: []
    }, {
        name: 'close',
        type: 'function',
        inputs: [],
        outputs: []
    }, {
        name: 'deposit',
        type: 'function',
        inputs: [{
            name: '_id',
            type: 'hash256'
        }],
        outputs: []
    }, {
        name: 'refill',
        type: 'function',
        inputs: [],
        outputs: []
    }, {
        name: 'transfer',
        type: 'function',
        inputs: [],
        outputs: []
    }, {
        name: 'NomineesChanged',
        type: 'event'
    }, {
        name: 'BoxOpened',
        type: 'event'
    }, {
        name: 'AnonymousDeposit',
        type: 'event'
    }, {
        name: 'Deposit',
        type: 'event'
    }, {
        name: 'Refill',
        type: 'event'
    }, {
        name: 'Transfer',
        type: 'event'
    }];
};

mocha.exports = ClientReceipt();
   
