const mysql = require("mysql");
const config = require("./config");

const connection = mysql.createConnection(config.database);

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    throw err;
  }
  console.log("Connected to MySQL");
});

module.exports = connection;
