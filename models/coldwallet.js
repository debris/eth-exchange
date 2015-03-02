var mongoose = require('mongoose');

/**
 * Used to store information about coldwallet
 * address - address of coldwallet
 * expectedBalance - balance which is expected to be there
 * maxBalance - max value that can be stored on this coldwallet
 */
var Coldwallet = new mongoose.Schema({
    address: String,
    expectedBalance: Number,
    maxBalance: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('coldwallet', Coldwallet);

