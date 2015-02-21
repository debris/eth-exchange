var mongoose = require('mongoose');

/**
 * Every user operation registered by exchange should leave the trace
 * User deposits and withdraws should stored here
 * user - user who performed operation
 * type - type of transaction: deposit or withdraw
 * state - if transaction needs to be confirmed by exchange, it's pendning, otherwise it's accepted
 */
var Operation = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    type: {
        type: String,
        enum: ['deposit', 'withdraw'],
    },
    state: {
        type: String,
        enum: ['pending', 'accepted'],
        default: 'pending'
    }
});

module.exports = mongoose.model('operation', Operation);

