var web3 = require('ethereum.js');
var config = require('../../../config/config')

web3.setProvider(new web3.providers.HttpSyncProvider(config.eth));

module.exports = web3;

