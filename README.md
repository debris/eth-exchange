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


### Addendum for ArchLinux
Make sure you have node.js and mongodb. You can get them via pacman with
```sudo pacman -S nodejs mongodb```

If you are getting problems at `npm install` due to `gyp` then use:
```npm config set python /usr/bin/python2.7 -g```

This way npm (and gyp) will know which version of python to use and not use python 3
which is the ArchLinux default.

### General Installation Command

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

