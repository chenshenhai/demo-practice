const moment = require('moment');
const { createConnect } = require('./util');
const config = require('./config');
const { createDatabase } = require('./database');
const { createTable } = require('./table');
const doConnect = createConnect(config);
main();

async function main() {
  await createDatabase(config.database);
  await createTable();
  await insertData();
  await insertList();
  await queryLastHourData();
}


async function insertData() {
  const sql = `
    INSERT INTO \`user_info\` SET ?;
  `;
  const values = {
    name: 'Hello',
    password: Math.random().toString(36).substr(2),
  }
  const result = await doConnect(sql, values);
  if (result.insertId > 0) {
    console.log('insert table success!');
  } else {
    console.log('insert table fail!');
  }
}


async function insertList() {
  const sql = `
    INSERT INTO \`user_info\` (name, password) VALUES ?;
  `;
  const values =  [0, 1, 2, 3, 4].map((i) => {
    return [`Hello${i}`, Math.random().toString(36).substr(2)]
  })
  const result = await doConnect(sql, [values]);
  if (result.insertId > 0) {
    console.log('insert table success!');
  } else {
    console.log('insert table fail!');
  }
}

async function queryLastHourData() {
  const end = Date.now();
  const start = end - (1000 * 60);
  const startTime =  moment(new Date(start)).format('YYYY-MM-DD HH:mm:ss');
  const endTime = moment(new Date(end)).format('YYYY-MM-DD HH:mm:ss');
  console.log('startTime =', startTime);
  const sql = `
    SELECT * FROM \`user_info\` 
    WHERE  TIMESTAMP(create_time) BETWEEN ? AND ?  ORDER BY TIMESTAMP(create_time) DESC;
  `;
  const result = await doConnect(sql, [startTime, endTime]);
  console.log('select results = ', result);
}

