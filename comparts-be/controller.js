const { response } = require("express");
let db = require("./db");

module.exports = {
  search: (req, res) => {
    if (!Object.keys(req.query).length) {
      let sql = "SELECT * FROM tbl_cpu";
      db.query(sql, (err, response) => {
        if (err) {
          res.status(500);
        }
        res.json(response);
      });
    } else {
      let sql = "SELECT * FROM tbl_cpu WHERE ?";
      db.query(sql, [req.query], (err, response) => {
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
    let sql =
      "INSERT INTO tbl_cpu SET ?";
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
