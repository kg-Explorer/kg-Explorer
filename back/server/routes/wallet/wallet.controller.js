const { createPublicKey } = require('./wallet')
const pool = require('../../db');

const createAddress = async(req, res) => {
    const {privateKey, publicKey} = createPublicKey();
    const [wallet] = await pool.query(`INSERT INTO wallet(privateKey, publicKey) VALUES('${privateKey}', '${publicKey}')`);
    console.log('publicKey : ' + publicKey)
    res.json({publicKey});
};

const checkAddress = async (req, res) => {
    console.log(req.body.data);
    const [wallet] = await pool.query(`SELECT * FROM wallet WHERE publicKey='${req.body.data}'`)
    console.log('publicKey : ' + req.body.data)
    const publicKey = req.body.data;
    res.json({publicKey});
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