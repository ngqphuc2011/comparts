const { response } = require("express");
let db = require("./db");

module.exports = {
	search: (req, res) => {
		let sql = "SELECT * FROM tbl_cpu";
		if (!Object.keys(req.query).length) {
			db.query(sql, (err, response) => {
				if (err) {
					res.status(500);
				}
				res.json(response);
			});
		} else {
			let query = " WHERE ";
			Object.entries(req.query).forEach((item) => {
				if (typeof item[1] === "object") {
					query += `${item[0]} IN (${Object.values(item[1]).map(
						(x) => `'${x}'`,
					)}) AND `;
				} else {
					query += `${item[0]} IN ('${item[1]}') AND `;
				}
			});
			db.query(sql + query + "1", (err, response) => {
				if (err) {
					res.status(500);
				}
				res.json(response);
			});
		}
	},
	detail: (req, res) => {
		let sql = "SELECT * FROM tbl_cpu WHERE id = ?";
		db.query(sql, [req.params.id], (err, response) => {
			if (err) {
				res.status(500);
			}
			res.json(response);
		});
	},
	delete: (req, res) => {
		let sql = "DELETE FROM tbl_cpu WHERE id = ?";
		db.query(sql, [req.params.id], (err, response) => {
			if (err) {
				res.status(500);
			}
			res.json("Deleted");
		});
	},
	insert: (req, res) => {
		let sql = "INSERT INTO tbl_cpu SET ?";
		db.query(sql, [req.body], (err, response) => {
			if (err) {
				res.status(500);
			}
			res.json("Inserted");
		});
	},
	update: (req, res) => {
		let sql = "UPDATE tbl_cpu SET ? WHERE id = ?";
		db.query(sql, [req.body, req.params.id], (err, response) => {
			if (err) {
				res.status(500);
			}
			res.json("Updated");
		});
	},
};
