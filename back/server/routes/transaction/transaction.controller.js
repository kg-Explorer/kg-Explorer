const pool = require('../../db');

const txSend = async (req, res) => {
    // 코인 보내고(tx db에 넣고) 보유 수량 줄이기

    console.log('txSend : ' + req.body.data)

    try {
        console.log('txSend Try : ' + req.body.data)
        
        const [result] = await pool.query(`INSERT INTO tx(txFrom, txTo, txAmount) VALUES('${req.body.txFrom}', '${req.body.txTo}', '${req.body.amount}');`)
        const [result2] = await pool.query(`UPDATE wallet SET walletAmount = walletAmount - ${req.body.amount} WHERE publicKey='${req.body.txFrom}';`)
        const [result3] = await pool.query(`UPDATE wallet SET walletAmount = walletAmount + ${req.body.amount} WHERE publicKey='${req.body.txTo}';`)
        res.json({result, result2, result3})
        console.log('txSend')
        console.log({result, result2, result3})
        
    } catch (error) {
        console.log(error)
    }
};

const txRead = async (req, res) => {
    // 거래 다 읽어오기
    // console.log('txRead : ' + req.body.data)
    const [result] = await pool.query(`SELECT * FROM tx WHERE (txFrom='${req.body.data}' OR txTo='${req.body.data}');`)
    console.log("txRead")
    console.log(result)
    res.json(result)
};

// const txView = async (req, res) => {
//     const [result] = await pool.query(`SELECT * FROM tx`)
// }

module.exports = {
    txSend,
    txRead,
}