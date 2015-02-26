var mongoose = require('mongoose');

/**
 * Used to store data about exchange
 * address - exchange addres of the hotwallet
 * owner - address of the owener of hotwallet
 * expectedBalance - the balance that should be on exchange hotwallet according to registred receipts
 * open - is true if exchange hotwallet is open
 * keyholder - exchange keyholder
 * executive - exchange executive
 */
var Exchange = new mongoose.Schema({
    address: String,
    owner: String,
    expectedBalance: {
        type: String,
        default: '0x'
    },
    open: Boolean,
    keyholder: String,
    executive: String
});

module.exports = mongoose.model('exchange', Exchange);

