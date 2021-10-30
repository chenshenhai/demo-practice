import mysql from 'mysql';

function createPool(config: any) {
  return function doPool(sql: string) {
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
          resolve(results);
        }
      });
    });
  }
}

function createConnect(config: any) {
  return function doConnect(sql:string, values?: any) {
    const conn = mysql.createConnection(config)
    conn.connect();
    return new Promise((resolve, reject) => {
      conn.query(sql, values, (err: any, rows: any) => {
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



export {
  createPool,
  createConnect,
}