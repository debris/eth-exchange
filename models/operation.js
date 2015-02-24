var mongoose = require('mongoose');

/**
 * Every user operation registered by exchange should leave the trace
 * User assets buys and sells should be stored here 
 * user - user who performed operation
 * type - type of transaction: buy or sell 
 * state - if transaction needs to be confirmed state is pending, otherwise finished 
 * assets - number of assets in this operation
 * price - price of these assets, TODO: check if they shouldnt' be in hex
 */
var Operation = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    type: {
        type: String,
        enum: ['buy', 'sell'],
    },
    state: {
        type: String,
        enum: ['failed', 'pending', 'finished'],
        default: 'pending'
    },
    assets: Number,
    price: Number,
    date: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('operation', Operation);

