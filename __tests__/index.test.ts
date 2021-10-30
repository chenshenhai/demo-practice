import process from 'process';
import { createConnect, createPool } from '../src/util';
const { DATABASE = '', MYSQL_PWD } = process.env || {};

const config = {
  host : '127.0.0.1',
  user : 'root',
  password : MYSQL_PWD,
  database : DATABASE,
}

describe('test: index', ( ) => {

  const doPool = createPool(config);
  const doConnect = createConnect(config);
  
  async function createTable() {
    const sql = `
    CREATE TABLE  IF NOT EXISTS  \`user_info\` (
      \`id\` int(11) NOT NULL AUTO_INCREMENT, 
      \`password\` varchar(255) DEFAULT NULL, 
      \`name\` varchar(255) DEFAULT NULL, 
      \`create_time\` datetime DEFAULT CURRENT_TIMESTAMP, 
      \`modified_time\` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `;
    const result = await doConnect(sql);
    return result;
  }

  async function createDatabase(database: string) {
    const sql = `CREATE DATABASE ${database};`;
    const result = await doPool(sql);
    return result;
  }

  async function insertList() {
    const sql = `
      INSERT INTO \`user_info\` (name, password) VALUES ?;
    `;
    const values =  [0, 1, 2, 3, 4].map((i) => {
      return [`Hello${i}`, Math.random().toString(36).substr(2)]
    })
    const result = await doConnect(sql, [values]);
    return result;
  }
  
  it('create database', (done) => {
    createDatabase(DATABASE).then((result: any) => {
      expect(result.affectedRows).toEqual(1);
      done();
    }).catch((err) => {
      done(err);
    });
  });

  it('create table', (done) => {
    createTable().then((result: any) => {
      expect(result.affectedRows).toEqual(0);
      done();
    }).catch((err) => {
      done(err);
    });
  });

  it('insert data', (done) => {
    insertList().then((result: any) => {
      expect(result.affectedRows).toEqual(5);
      done();
    }).catch((err) => {
      done(err);
    });
  });

})

// test('test dom', async () => {
//   expect(1+1).toEqual(2);
// });