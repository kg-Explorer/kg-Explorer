const pool = require('../../db.js')

const getblock = async (req, res) => {
    const [blocks] = await pool.query(`SELECT * FROM blocks`)
    console.log('blocks : ', blocks)

    res.json(blocks)
}

const createBlock = async (req, res) => {
    const {blockIndex, data, timestamp ,hash, previousHash, difficulty, nonce} = req.body
    const [blocks] = await pool.query(`INSERT INTO blocks(blockIndex, data, timestamp, hash, previousHash, difficulty, nonce) VALUES(${blockIndex},'${data}', '${timestamp}','${hash}','${previousHash}',${difficulty},${nonce})`);
    console.log(blocks)
    res.json(blocks)
}
 
module.exports = {
    getblock,
    createBlock,
};