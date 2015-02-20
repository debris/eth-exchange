# eth-exchange poc implementation

[![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url]

[travis-image]: https://travis-ci.org/debris/eth-exchange.svg
[travis-url]: https://travis-ci.org/debris/eth-exchange
[coveralls-image]: https://coveralls.io/repos/debris/eth-exchange/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/r/debris/eth-exchange?branch=master

## Prerequisites

* node
* npm
* mongodb
* cpp-ethereum

## Installation

```bash
git clone https://github.com/debris/eth-exchange
cd eth-exchange
npm install
```

## Run

```bash
# start ethereum with json-rpc server
# by default port 8080
eth -j

# start mongodb
mongod

# start eth-exchange
# by default port 2000, configurable in config.js
npm start
```

## Configuration

Exchange configuration can be found in [config/config.js](https://github.com/debris/eth-exchange/blob/master/config/config.js).

