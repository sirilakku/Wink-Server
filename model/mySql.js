const mySql = require("mysql");

let connectionString = mySql.createConnection({
  host: "localhost",
  port : 3306,
  user: "root",
  password: ""
  //database: "Database"
});

connectionString.connect(
  function (err) {
  if (err) {
    console.log("Database connection Error");
  } else {
    console.log("MySql Database Connected!");
  }
 }
 );

module.exports = connectionString;
