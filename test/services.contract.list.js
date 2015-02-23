var Q = require('q');
var chai = require('chai'); 
var chaiAsPromised = require('chai-as-promised');
var contract = require('../services/contract');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('contract', function () {
    describe('list', function () {
        it('should list all solidity contracts', function () {
            return expect(contract.list()).to.eventually.become(["ClientReceipt"]);
        });
    });
});

