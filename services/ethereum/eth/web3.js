var web3 = require('ethereum.js');
web3.setProvider(new web3.providers.HttpSyncProvider());

module.exports = web3;

