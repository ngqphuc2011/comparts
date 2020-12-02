const sequelize = require("../config/database");
const { initMobo } = require("../utils/init");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const fs = require("fs");
const publicFilePath = "./public/mobos";
const { upload } = require("../utils/multer")
const mobo = require("../models/mobo")(sequelize, Sequelize);
initMobo(mobo);

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
		mobo
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
			.then((mobo) => {
				const response = getPagingData(mobo, page, limit);
				res.send(response);
			}).catch((err) => {
                res.status(500).send(err)
            });
	},
	detail: (req, res) => {
		mobo.findAll({ where: { id: req.params.id } }).then((mobo) => {
			res.json(mobo);
		}).catch((err) => {
			res.status(500).send(err)
		});
	},
	delete: (req, res) => {
		mobo.destroy({ where: { id: req.params.id } }).then(() => {
			res.json("Deleted");
		}).catch((err) => {
			res.status(500).send(err)
		});
	},
	create: (req, res) => {
		mobo.create(req.body).then(() => {
			res.json("Created");
		}).catch((err) => {
			res.status(500).send(err)
		});
	},
	update: (req, res) => {
		mobo
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
			if (err) {
				res.status(500).send(err)
			}
			res.json(req.file);
		});;
	},
	deleteImage: (req, res) => {
		req.body.forEach(img => {
			fs.unlink(`${publicFilePath}/${img}`, (err) => {
				if (err) {
                    res.status(500).send(err)
                }
				res.json("Deleted")
			})
		});
	},
	getNullImage: (req, res) => {
		res.end();
	},
};
