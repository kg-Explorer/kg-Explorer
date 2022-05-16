const express = require('express');
const router = express.Router();
const transactionController = require('./transaction.controller')

router.post('/txFrom', transactionController.txFrom);
router.post('/txTo', transactionController.txTo);

module.exports = router;
