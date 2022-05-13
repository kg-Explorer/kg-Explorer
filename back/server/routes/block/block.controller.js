const { getBlocks, mineBlock, autoMineBlock, getLatestBlock, getDifficultyLog } = require('./block')
const pool = require('../../db.js')

const getblock = async (req, res) => {
    const [[blocks]] = await pool.query(`SELECT * FROM getblock`)

    res.json(blocks)
}

const createBlock = async (req, res) => {
    const {blockIndex, data, hash, previousHash, difficulty, nonce} = req.body
    const [blocks] = await pool.query(`INSERT INTO getblock(blockIndex, data, hash, previousHash, difficulty, nonce) VALUES(${blockIndex},'${data}','${hash}','${previousHash}',${difficulty},${nonce})`);
    console.log(blocks)
    res.json(blocks)
}

const blocks = (req, res) => {
    res.send(getBlocks())
}

const latestBlock = (req, res) => {
    res.send(getLatestBlock());
}

const miningBlock = (req, res) => {
    res.send(mineBlock(req.body.data));
}

const autoMiningBlock = (req, res) => {
    res.send(autoMineBlock(req.body.data, req.body.count));
}

const log = (req, res) => {
    res.send(getDifficultyLog());
}

module.exports = {
    getblock,
    createBlock,
    blocks,
    latestBlock,
    miningBlock,
    autoMiningBlock,
    log
};