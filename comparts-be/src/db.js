require('dotenv').config();
const Sequelize = require("sequelize");
// const mysql = require("mysql2");

// const db = mysql.createConnection({
//   host: process.env.DB_HOST || "localhost",
//   user: process.env.DB_USER || "root",
//   password: process.env.DB_PASS || "123456",
//   database: process.env.DB_NAME || "comparts",
// });

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
	host: "localhost",
	dialect: "mysql",
});

module.exports = sequelize;
