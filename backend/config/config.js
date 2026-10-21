
require('dotenv').config();
const mysql = require('mysql2');
const db = mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT || 3308)
});
db.connect(function (err) {
    if (err) throw err;
    console.log('Base de datos conectada')
});
module.exports = db;
