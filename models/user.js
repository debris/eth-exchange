var mongoose = require('mongoose');

/**
 * User is used to store exchange related data about user
 * name - is display name of the user
 * identity - exchange identity of the user, should be used to deposit funds
 * address - blockchain address of user hot wallet
 * balance - total balance of user funds stored in hot and cold wallet together, in hex
 */
var User = new mongoose.Schema({
    name: String,
    identity: String,
    address: String,
    balance: {
        type: String,
        default: '0x'
    }
});

module.exports = mongoose.model('user', User);

