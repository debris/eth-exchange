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
eth -j

# start mongodb
mongod

# start eth-exchange
npm start
```

