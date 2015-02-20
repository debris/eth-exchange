var config = require('../../config/config');

module.exports = config.mockEth ? require('./mock/web3') : require('./eth/web3');

