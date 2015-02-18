var mongoose = require('mongoose');

var User = new mongoose.Schema({
    name: String,
    balance: Number,
    identity: String
});

module.exports = mongoose.model('user', User);

