var mongoose = require('mongoose');

var Operation = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    type: {
        type: String,
        enum: ['pending', 'accepted'],
        default: 'pending'
    }
});

module.exports = mongoose.model('operation', Operation);

