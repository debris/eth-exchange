
/**
 * Mock web3 object, so we are able to run develop exchange without running eth all the time
 */
web3 = {
    eth: {
        solidity: function (code) {
            return code;
        },
        transact: function (object) {
            return "mock"; 
        }
    },
};

Object.defineProperty(web3, 'accounts', {
    get: function () {
        return ['0x0000000000mock']
    } 
});

module.exports = web3;

