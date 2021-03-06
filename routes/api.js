var express = require('express');
var router = express.Router();
var auth = require('../services/auth');

var users = require('../controllers/users');
var receipts = require('../controllers/receipts');
var contracts = require('../controllers/contracts');
var exchange = require('../controllers/exchange');
var coldwallet = require('../controllers/coldwallets');
var generic = require('../controllers/generic');

router.get('/user', auth.authenticateUser, users.current);
router.get('/receipts', auth.authenticateUser, receipts.list);
router.post('/receipts/withdraw', auth.authenticateUser, receipts.withdraw);
router.get('/contracts/interface', auth.authenticateUser, contracts.interface);
router.get('/exchange/address', auth.authenticateUser, exchange.address);

router.get('/admin/exchange', auth.authenticateAdmin, exchange.get);
router.post('/admin/exchange/thresholds', auth.authenticateAdmin, exchange.updateThresholds);
router.get('/admin/receipts', auth.authenticateAdmin, receipts.all);
router.post('/admin/receipts/accept', auth.authenticateAdmin, receipts.accept);
router.get('/admin/coldwallets', auth.authenticateAdmin, coldwallet.all);
router.post('/admin/coldwallets', auth.authenticateAdmin, coldwallet.create);
router.post('admin/coldwallets/:colwallet', auth.authenticateAdmin, coldwallet.update);

router.get('/:model', auth.authenticateAdmin, generic.list);
router.get('/:model/:key/:id', auth.authenticateAdmin, generic.get);
router.post('/:model', auth.authenticateAdmin, generic.create);
router.post('/:model/:key/:id', auth.authenticateAdmin, generic.update);

module.exports = router;

