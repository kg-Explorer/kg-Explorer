const { createPublicKey } = require('./wallet')
const pool = require('../../db');

const createAddress = async(req, res) => {
    const {privateKey, publicKey} = createPublicKey();
    const [wallet] = await pool.query(`INSERT INTO wallet(privateKey, publicKey) VALUES('${privateKey}', '${publicKey}')`);
    console.log('create Address : ' + wallet)
    res.send('wallet create test');
};

const checkAddress = async (req, res) => {
    console.log(req.body.data);
    const [wallet] = await pool.query(`SELECT * FROM wallet WHERE publicKey=${req.body.data}`)
    res.send('post test2')
}

module.exports = {
    createAddress,
    checkAddress
}