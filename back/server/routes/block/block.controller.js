const pool = require('../../db.js')

const getblock = async (req, res) => {
    const [blocks] = await pool.query(`SELECT * FROM getblock`)

    res.json(blocks)
}

const createBlock = async (req, res) => {
    const {blockIndex, data, hash, previousHash, difficulty, nonce} = req.body
    const [blocks] = await pool.query(`INSERT INTO getblock(blockIndex, data, hash, previousHash, difficulty, nonce) VALUES(${blockIndex},'${data}','${hash}','${previousHash}',${difficulty},${nonce})`);
    console.log(blocks)
    res.json(blocks)
}
 
module.exports = {
    getblock,
    createBlock,
};