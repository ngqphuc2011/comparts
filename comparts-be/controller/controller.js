const sequelize = require("../src/database");
const { initCpu } = require("../src/init-db");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

const fs = require("fs");
const path = require("path");
const multer = require("multer");

const publicFilePath = "./public/cpus/";
const storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, publicFilePath);
	},
	filename: function (req, file, callback) {
		callback(
			null,
			file.fieldname + "-" + Date.now() + path.extname(file.originalname),
		);
	},
});
const upload = multer({ storage: storage }).single("img");

const cpu = require("../model/cpu.model")(sequelize, Sequelize);
initCpu(cpu);

module.exports = {
	search: (req, res) => {
		const getPagination = (page, size) => {
			const limit = size ? +size : 6;
			const offset = page ? page * limit : 0;

			return { limit, offset };
		};

		const getPagingData = (data, page, limit) => {
			const { count: totalItems, rows: items } = data;
			const currentPage = page ? +page : 0;
			const totalPages = Math.ceil(totalItems / limit);

			return { totalItems, items, totalPages, currentPage };
		};
		const { page, size } = req.query;
		const { limit, offset } = getPagination(page, size);

		if (Object.keys(req.query).length !== 0) {
			let where = [];
			for (q in req.query) {
				if (q !== "page" && q != "size") {
					let obj = {};
					if (req.query[q] instanceof Array) {
						obj[q] = { [Op.in]: req.query[q] };
					} else {
						obj[q] = { [Op.in]: [req.query[q]] };
					}
					where.push(obj);
				}
			}
			cpu
				.findAndCountAll({
					where: {
						[Op.and]: where,
					},
					limit,
					offset,
				})
				.then((cpus) => {
					const response = getPagingData(cpus, page, limit);
					res.send(response);
				});
		} else {
			cpu
				.findAndCountAll({
					limit,
					offset,
				})
				.then((cpus) => {
					const response = getPagingData(cpus, page, limit);
					res.send(response);
				});
		}
	},
	detail: (req, res) => {
		cpu.findAll({ where: { id: req.params.id } }).then((cpus) => {
			res.json(cpus);
		});
	},
	delete: (req, res) => {
		cpu.destroy({ where: { id: req.params.id } }).then(() => {
			res.json("Deleted");
		});
	},
	create: (req, res) => {
		cpu.create(req.body).then(() => {
			res.json("Created");
		});
	},
	update: (req, res) => {
		cpu
			.update(req.body, {
				where: {
					id: req.params.id,
				},
			})
			.then(() => {
				res.json("Updated");
			});
	},
	saveImage: (req, res) => {
		upload(req, res, (err) => {
			res.json(req.file);
		});
	},
	deleteImage: (req, res) => {
		console.log(req);
		res.json("helloS");
	},
	getDummyImage: (req, res) => {
		res.end();
	},
};
