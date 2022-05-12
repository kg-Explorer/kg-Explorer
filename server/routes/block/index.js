const express = require('express');
const router = express.Router();
const blockController = require('./block.controller');

router.get('/getblock', blockController.getblock);

module.exports = router;