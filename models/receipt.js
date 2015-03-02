var mongoose = require('mongoose');
var date = require('./extensions/date');

/**
 * Receipt is used to store data about exchange transfers in database
 * hash - hash of the transaction
 * identity - identity of the user
 * value - value of transfer, in hex
 * type - type of transfer, can be deposit of withdraw
 * state - state of transfer, for deposit it is always finished, for withdraw all states are valid
 *          external means, that is was not signed in the exchange
 * from - address from which transaction was made
 * to - destination of transaction
 * block - number of the block in which transaction was made
 * date - date of receipt creation
 */
var Receipt = new mongoose.Schema({
    hash: String,
    identity: String,
    value: Number,
    type: {
        type: String,
        enum: ['deposit', 'withdraw', 'drain', 'refill']
    },
    state: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'finished', 'external']
    },
    from: String,
    to: String,
    block: Number,
    date: Date
});

Receipt.pre('save', date);

module.exports = mongoose.model('receipt', Receipt);

