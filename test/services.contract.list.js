var Q = require('q');
var chai = require('chai'); 
var chaiAsPromised = require('chai-as-promised');
var contracts = require('../services/contracts');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('contract', function () {
    describe('list', function () {
        it('should list all solidity contracts', function () {
            return expect(contracts.list()).to.eventually.become(['ClientReceipt', 'ClientReceipt2']);
        });
    });
});

