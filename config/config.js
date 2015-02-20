var env = process.env.NODE_ENV || 'develop';
var mongoHost = process.env.MONGO_HOST || 'localhost';

var config = {
    develop: {
        port: process.env.PORT || 2000,
        db: 'mongodb://' + mongoHost + '/eth-exchange-develop',
        mockEth: false 
    },
    production: {
        port: process.env.PORT || 3000,
        db: 'mongodb://' + mongoHost + '/eth-exchange-production',
        mockEth: false
    },
    test: {
        port: process.env.PORT || 3001,
        db: 'mongodb://' + mongoHost + '/eth-exchange-test',
        mockEth: false
    }
};

module.exports = config[env];

