/**
 * Add creation date to model
 */
var date = function (next) {
    if (this.date) {
        return;
    }
    this.date = Date.now();
    next();
};

module.exports = date;

