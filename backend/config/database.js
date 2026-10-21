require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10),
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'foodtrans_nqr',
  port: Number(process.env.DB_PORT || 3308),
  multipleStatements: false,
});

function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (error, results) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(results);
    });
  });
}

module.exports = {
  pool,
  query,
};
