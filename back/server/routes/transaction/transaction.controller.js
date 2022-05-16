const pool = require('../../db');

const txFrom = (req, res) => {
    res.send('txFrom test')
};

const txTo = (req, res) => {
    res.send('txTo test')
};

module.exports = {
    txFrom,
    txTo,
}