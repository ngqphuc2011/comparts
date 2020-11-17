let mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "fPl@PtIT61",
  database: process.env.DB_NAME || "comparts",
});

module.exports = db;
