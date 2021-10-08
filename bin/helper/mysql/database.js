const mysql = require('mysql2');
const config = require('../../helper/global_config');
const logger = require('../../helper/logger/logger');

const query = async (cfg) => {
  let connection = mysql.createConnection({
    host: config.get('/mySql/host'),
    user: config.get('/mySql/user'),
    password: config.get('/mySql/password'),
    database: config.get('/mySql/database'),
  });

  connection.connect((err) => {
    if(err){
      logger.log('mysql-createConnection', `Error Connect to Mysql: ${err}`);
    }
  });

  connection.query(cfg, (err, result) => {
    if(err) {
      logger.log('mysql-query', `Error querying Mysql: ${err}`);
    }
    else{
      logger.log('log-calls', `Add Log Get Movie Success, Log ID: ${result.insertId}`);
    }
  });
};

module.exports = {
  query
};
