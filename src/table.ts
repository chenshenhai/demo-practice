import config from './config'
import { createConnect } from './util';

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


export {
  createTable
}