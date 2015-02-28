/**
 * Add creation date to model
 */
var date = function (next) {
    if (this.date) {
        return;
    }
    this.date = new Date(); 
    next();
};

