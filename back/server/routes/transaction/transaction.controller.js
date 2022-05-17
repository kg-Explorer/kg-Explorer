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
    try {
        const [txData] = await pool.query(`SELECT * FROM tx WHERE txFrom='${req.body.data}' OR txTo='${req.body.data}';`)
        const [blockData] = await pool.query(`SELECT * FROM blocks WHERE miner='${req.body.data}'`)
        console.log(txData[0] === undefined)
        console.log(blockData)
        if(txData[0] !== undefined && blockData[0] !== undefined) {
            res.json({txData:txData, blockData:blockData})
        } else if (txData[0] === undefined && blockData[0] !== undefined ) {
            res.json({txData:null, blockData:blockData})
        } else if (txData[0] !== undefined && blockData[0] === undefined ) {
            res.json({txData:txData, blockData:null})
        } else {
            res.json({txData:null, blockData:null})
        }
    } catch (error) {
        console.log(error)
        res.json({txData:null, blockData:null})
    }
};

// const txView = async (req, res) => {
//     const [result] = await pool.query(`SELECT * FROM tx`)
// }

module.exports = {
    txSend,
    txRead,
}