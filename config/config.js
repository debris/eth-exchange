var env = process.env.NODE_ENV || 'develop';
var mongoHost = process.env.MONGO_HOST || 'localhost';
var port = process.env.PORT;
var mockEth = process.env.MOCK_ETH;
var ethHost = process.env.ETH_HOST || 'localhost';
var ethPort = process.env.ETH_PORT || 8080;

/**
 * Default configuration for develop/production/tests environments
 * port - default port for HTTP
 */
var config = {
    develop: {
        port: port || 2000,
        db: 'mongodb://' + mongoHost + '/eth-exchange-develop'
    },
    production: {
        port: port || 3000,
        db: 'mongodb://' + mongoHost + '/eth-exchange-production'
    },
    test: {
        port: port || 3001,
        db: 'mongodb://' + mongoHost + '/eth-exchange-test'
    }
};

var current = config[env];
current.mockEth = mockEth || false;
current.eth = 'http://' + ethHost + ':' + ethPort;

module.exports = current;

