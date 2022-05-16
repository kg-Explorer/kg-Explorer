const express = require('express');
const router = express.Router();
const transactionController = require('./transaction.controller')

router.post('/txSend', transactionController.txSend);

router.post('/txRead', transactionController.txRead);

module.exports = router;