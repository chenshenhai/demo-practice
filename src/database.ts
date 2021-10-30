import { createPool } from './util';
import config from './config';

const doPool = createPool(config);

async function createDatabase(database: any) {
  const sql = `CREATE DATABASE ${database};`;
  const result = await doPool(sql);
  return result;
}

export {
  createDatabase
}