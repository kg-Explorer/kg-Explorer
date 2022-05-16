const { createPublicKey } = require('./wallet')
const pool = require('../../db');

const createAddress = async(req, res) => {
    const {privateKey, publicKey} = createPublicKey();
    const [wallet] = await pool.query(`INSERT INTO wallet(privateKey, publicKey, walletAmount) VALUES('${privateKey}', '${publicKey}', 0)`);
    console.log('publicKey : ' + publicKey)
    res.json({publicKey});
};

const checkAddress = async (req, res) => {
    console.log(req.body.data);
    const [wallet] = await pool.query(`SELECT * FROM wallet WHERE publicKey='${req.body.data}'`)
    res.send('post test2')
}

const addressAll = async (req, res) => {
    console.log('addressAll : ' + req.body.data);
    const [wallet] = await pool.query(`SELECT publicKey FROM wallet`)
    console.log('addressAll wallet' + wallet)
    res.json({wallet})
}

module.exports = {
    createAddress,
    checkAddress,
    addressAll,
}