const mySql = require("mysql");
require('dotenv').config()

let connectionString = mySql.createConnection({
  host: process.env.MYSQL_HOSTNAME,
  port : process.env.MYSQL_PORT,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD
  //database: "Database"
});
console.log(process.env)
connectionString.connect(function (err) {
  if (err) {
    console.log("Database connection Error");
  } else {
    console.log("MySql Database Connected!");
  }
 });

module.exports = connectionString;
