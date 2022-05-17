const express = require('express');
const router = express.Router();
const walletController = require('./wallet.controller');

router.get('/createAddress', walletController.createAddress);

router.get('/addressAll', walletController.addressAll);

router.post('/checkAddress', walletController.checkAddress);


module.exports = router;