let mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "fPl@PtIT61",
  database: "computer_parts",
});

module.exports = db;
