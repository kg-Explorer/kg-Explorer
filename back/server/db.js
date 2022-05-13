const mysql = require('mysql2/promise')

const pool = mysql.createPool({
    host : '3.80.201.98',
    user : 'sieun',
    password : 'Enffl5962!',
    database : 'blockchain'
})

module.exports = pool;