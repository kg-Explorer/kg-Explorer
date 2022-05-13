const express = require('express');
const router = express.Router();
const blockController = require('./block.controller');

router.get('/getblock', blockController.getblock);


router.post('/createBlock', blockController.createBlock);

router.get('/blocks', blockController.blocks)

router.get('/latestBlock', blockController.latestBlock)

router.post('/miningBlock', blockController.miningBlock)

router.post('/autoMiningBlock', blockController.autoMiningBlock)

router.get('/log', blockController.log)

router.get('/createWallet', blockController.getWallet)

router.post('/createWallet', blockController.setWallet)

module.exports = router;