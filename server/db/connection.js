const mysql = require("mysql2/promise");
const config = require("../config").db;

module.exports = {
  getConnection: async () => {
    const connection = await mysql.createConnection(config);
    return connection;
  }
};

/**
sample query using this mysql connection:
const db = require('./db/connection');
db.getConnection()
  .then(dbConnection => {
    return dbConnection.query('select * from items');
  })
  .then(([rows]) => {
    console.log(rows); // log each row selected
  });
*/
