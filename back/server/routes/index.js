const express = require('express');
const router = express.Router();
const blockRouter = require('./block');
const walletRouter = require('./wallet');
const transactionRouter = require('./transaction')

router.use('/block', blockRouter);

router.use('/wallet', walletRouter);

router.use('/transaction', transactionRouter);

module.exports = router;