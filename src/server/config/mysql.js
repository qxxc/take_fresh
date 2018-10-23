const mysql = require('mysql')
const dbName = mysql.createPool({
    host: 'localhost',
    port:'3306',
    user: 'root',
    password: 'admin',
    database: 'take_fresh',
    connectionLimit:300
})



module.exports = dbName
