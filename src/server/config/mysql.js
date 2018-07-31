const mysql = require('mysql')
const dbName = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'take_fresh',
})



module.exports = dbName
