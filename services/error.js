/**
 * Returns callback to handle api response error
 */

var error = function (res) {
    return function (err) {
        console.error(err);
        res.send(400, err);
    };
};

module.exports = error;

