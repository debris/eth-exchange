var mongoose = require('mongoose');

/**
 * Receipt is used to store data about exchange transfers in database
 * identity - identity of the user
 * value - value of transfer, in hex
 * type - type of transfer, can be deposit of withdraw
 * state - state of transfer, for deposit it is always finished, for withdraw all states are valid
 * from - address from which transaction was made
 * to - destination of transaction
 * block - number of the block in which transaction was made
 * date - date of receipt creation
 */
var Receipt = new mongoose.Schema({
    identity: String,
    value: Number,
    type: {
        type: String,
        enum: ['deposit', 'withdraw']
    },
    state: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'finished']
    },
    from: String,
    to: String,
    block: Number,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('receipt', Receipt);

