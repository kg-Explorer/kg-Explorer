const express = require('express');
const router = express.Router();
const blockRouter = require('./block');
const walletRouter = require('./wallet');

router.use('/block', blockRouter);

router.use('/wallet', walletRouter);

module.exports = router;