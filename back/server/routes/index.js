const express = require('express');
const router = express.Router();
const blockRouter = require('./block');

router.use('/block', blockRouter);

module.exports = router;