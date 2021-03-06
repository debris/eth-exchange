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
* cpp-ethereum (from this [branch](https://github.com/debris/cpp-ethereum/tree/event_hash), it's not yet compatible with ethereum poc8 network)

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

### Running in ArchLinux
```bash
# start ethereum with json-rpc server
# by default port 8080
eth -j

# make sure mongodb is running
sudo systemctl start mongodb.service

# start eth-exchange
# by default port 2000, configurable in config.js
npm start
```

### Running in Debian based distros / Macosx
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

## Setting admin

You can give admin privilages to user by using [scipts/nominateAdmin.js](https://github.com/debris/eth-exchange/blob/master/scripts/nominateAdmin.js) script.

```bash
mongo eth-exchange-develop scripts/nominateAdmin.js
npm start
```

## Reseting exchange state

At any moment you can reset exchange state and force it to recreate it's state

```bash
mongo eth-exchange-develop scripts/resetHistory.js
npm start
```

## Debug

You can debug node app using node-inspector

```bash
# install node-inspector globally
npm install -g node-inspector

# start node-inspector at port 7000
node-debug -p 7000 bin/www
```

