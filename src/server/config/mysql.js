const mysql = require('mysql')
const dbName = mysql.createPool({
    host: '127.0.0.1',
    port:'3306',
    user: 'root',
    password: 'admin',
    database: 'take_fresh',
})



module.exports = dbName
