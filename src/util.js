const mysql = require('mysql');

function createPool(config) {
  return function doPool(sql) {
    return new Promise((resolve, reject) => {
      const pool = mysql.createPool({
        host : config.host,
        user : config.user,
        password : config.password,
      });
      pool.query(sql, (error, results, fields) => {
        if (error) {
          pool.end();
          reject(error);
        } else {
          pool.end();
          resolve(results, fields);
        }
      });
    });
  }
}

function createConnect(config) {
  return function doConnect(sql, values) {
    const conn = mysql.createConnection(config)
    conn.connect();
    return new Promise((resolve, reject) => {
      conn.query(sql, values, (err, rows) => {
        if (err) {
          conn.end();
          reject(err);
        } else {
          conn.end();
          resolve(rows);
        }
      })
    });
  }
}



module.exports = {
  createPool,
  createConnect,
}