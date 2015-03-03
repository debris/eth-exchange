var mongoose = require('mongoose');
var config = require('../config/config');

/**
 * Used to store data about exchange
 * address - exchange addres of the hotwallet
 * owner - address of the owener of hotwallet
 * expectedBalance - the balance that should be on exchange hotwallet according to registred receipts
 * open - is true if exchange hotwallet is open
 * keyholder - exchange keyholder
 * executive - exchange executive,
 * refill - exchange balance on which it should be refilled
 * drain - exchange balance on which it should be drained to coldwallet
 */
var Exchange = new mongoose.Schema({
    address: String,
    owner: String,
    expectedBalance: {
        type: Number,
        default: 0
    },
    open: Boolean,
    keyholder: String,
    executive: String,
    refill: {
        type: Number,
        default: config.defaultRefill
    },
    drain: {
        type: Number,
        default: config.defaultDrain
    },
    needsRefill: {
        type: Boolean,
        default: false
    },
    needsDrain: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('exchange', Exchange);

