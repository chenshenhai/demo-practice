const { createPool } = require('./util');
const config = require('./config');

const doPool = createPool(config);

async function createDatabase(database) {
  const sql = `CREATE DATABASE ${database};`;
  const result = await doPool(sql);
  return result;
}

module.exports = {
  createDatabase
}