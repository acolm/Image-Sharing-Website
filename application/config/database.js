const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    connectionLimit: 50,
    host:"localhost" ,
    user:"photoapp",
    password:"CSC317",
    database:"csc317db",
    insecureAuth: true,
    queueLimit: 0
    //debug: true
});

module.exports = pool;