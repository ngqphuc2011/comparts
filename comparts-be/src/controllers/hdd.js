const sequelize = require("../config/database");
const { initHdd } = require("../utils/init");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const fs = require("fs");
const publicFilePath = "./public/hdds";
const { upload } = require("../utils/multer")
const hdd = require("../models/hdd")(sequelize, Sequelize);
initHdd(hdd);

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

		const sParams = ["page", "size", "sort", "order"];
		const { page, size } = req.query;
		const { limit, offset } = getPagination(page, size);
		let { sort, order } = req.query;

		if (!sort) {
			sort = "name";
		}
		if (!order) {
			order = "ASC";
		}

		let where = [];
		for (q in req.query) {
			if (!sParams.includes(q)) {
				let obj = {};
				if (req.query[q] instanceof Array) {
					obj[q] = { [Op.in]: req.query[q] };
				} else {
					obj[q] = { [Op.in]: [req.query[q]] };
				}
				where.push(obj);
			}
		}
		hdd
			.findAndCountAll({
				where: {
					[Op.and]: where,
				},
				limit,
				offset,
				order: [
					[sort, order],
				],
			})
			.then((hdd) => {
				const response = getPagingData(hdd, page, limit);
				res.send(response);
			}).catch((err) => {
				res.status(500).send(err)
			});
	},
	detail: (req, res) => {
		hdd.findAll({ where: { id: req.params.id } }).then((hdd) => {
			res.json(hdd);
		}).catch((err) => {
			res.status(500).send(err)
		});
	},
	delete: (req, res) => {
		hdd.destroy({ where: { id: req.params.id } }).then(() => {
			res.json("Deleted");
		}).catch((err) => {
			res.status(500).send(err)
		});
	},
	create: (req, res) => {
		hdd.create(req.body).then(() => {
			res.json("Created");
		}).catch((err) => {
			res.status(500).send(err)
		});
	},
	update: (req, res) => {
		hdd
			.update(req.body, {
				where: {
					id: req.params.id,
				},
			})
			.then(() => {
				res.json("Updated");
			}).catch((err) => {
				res.status(500).send(err)
			});
	},
	saveImage: (req, res) => {
		upload(publicFilePath)(req, res, (err) => {
			res.json(req.file);
		});
	},
	deleteImage: (req, res) => {
		req.body.forEach(img => {
			fs.unlink(`${publicFilePath}/${img}`, (err) => {
				res.json("Deleted")
			})
		});
	},
	getNullImage: (req, res) => {
		res.end();
	},
};
