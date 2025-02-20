const mysql = require("mysql");
const parseDbUrl = require("parse-database-url");
if (process.env.APP_ENV !== "prod") {
  require("dotenv").config();
}
const setAutoIncrement = "SET @@auto_increment_increment=1;";
const DB_URL = "mysql://b18f0fbb286eb8:d317aac8@eu-cdbr-west-01.cleardb.com/heroku_e5627098f08b443?reconnect=true"

const execQuery = (sql = "") => {
  const parameters = [];
  return new Promise((resolve, reject) => {

    const parsedConfig = parseDbUrl(DB_URL);
    parsedConfig.multipleStatements = true;
 
    const connection = mysql.createConnection(parsedConfig);
    connection.connect();
    connection.on("error", (err) => {
      console.error("db error", err);
      console.error("db error code", err.code);
      try {
        connection.end();
      } catch (e) {
        reject(e);
      }
      connection.connect();
    });

    connection.query(setAutoIncrement + sql, [parameters], (err, result) => {
      if (err) {
        try {
          connection.end();
        } catch (e) {
          reject(e);
        }
        if (err.sql) {
          err.sql = err.sql.replace(setAutoIncrement, "");
        }
        reject(err);
      }
      connection.end();
      resolve(result);
    });
  });
};



module.exports = {
  execQuery
};
