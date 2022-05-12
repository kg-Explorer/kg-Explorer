const pool = require('../../db.js')

const getblock = (req, res) => {
    res.send('테스트')
}

const createBlock = (req, res) => {

    res.send(req.body.data)
}
 
module.exports = {
    getblock,
    createBlock,
};