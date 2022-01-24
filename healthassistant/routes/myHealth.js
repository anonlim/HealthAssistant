const express = require("express");
const router = express.Router();
const mysql = require("mysql");

router.use(express.urlencoded({ extended: false }));

const conn = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "@Binocchio66",
  database: "healthassistant",
};

let testQuery;

const connection = mysql.createConnection(conn); // DB 커넥션 생성
connection.connect(); // DB접속

router.get("/", (req, res) => {
  testQuery = `SELECT * FROM userHealth WHERE username = "${req.user.nickname}"`;
  connection.query(testQuery, (err, results, field) => {
    if (err) {
      console.log(err);
    } else {
      console.log(results);
      res.render("myHealth", {
        arr1: results,
      });
    }
  });
});

module.exports = router;
