var ClientReceipt = function () {
    return [{
        name: 'nominate',
        type: 'function',
        inputs: [{
            name: '_keyholder',
            type: 'address'
        }, {
            name: '_executive',
            type: 'address'
        }],
        outputs: []
    }, {
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
        type: 'event',
        inputs: [{
            name: 'keyholder',
            type: 'address'
        }, {
            name: 'executive',
            type: 'address'
        }]
    }, {
        name: 'BoxOpened',
        type: 'event',
        inputs: []
    }, {
        name: 'AnonymousDeposit',
        type: 'event',
        inputs: [{
            name: '_from',
            type: 'address'
        }, {
            name: '_value',
            type: 'uint'
        }]
    }, {
        name: 'Deposit',
        type: 'event',
        inputs: [{
            name: '_from',
            type: 'address'
        }, {
            name: '_id',
            type: 'hash'
        }, {
            name: '_value',
            type: 'uint'
        }]
    }, {
        name: 'Refill',
        type: 'event',
        inputs: [{
            name: '_from',
            type: 'address'
        }, {
            name: '_value',
            type: 'uint'
        }]
    }, {
        name: 'Transfer',
        type: 'event',
        inputs: [{
            name: '_from',
            type: 'address'
        }, {
            name: '_to',
            type: 'address'
        }, {
            name: '_value',
            type: 'uint'
        }]
    }];
};

mocha.exports = ClientReceipt();
   
