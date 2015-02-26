var mongoose = require('mongoose');

/**
 * Should be used to store information about last processed block
 * number - number of the last processed block
 */
var Block = new mongoose.Schema({
    number: Number
});

