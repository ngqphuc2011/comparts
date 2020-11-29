require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASS,
	{
		host: "127.0.0.1",
		dialect: "mysql",
	},
);

module.exports = sequelize;
