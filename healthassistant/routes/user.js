const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const conn = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "@Binocchio66",
  database: "healthassistant",
};

const connection = mysql.createConnection(conn); // DB 커넥션 생성
connection.connect(); // DB접속

router.use(express.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
  console.log("로그인 성공!");

  let testQuery = `SELECT * FROM user_info WHERE username="${req.user.nickname}"`;

  connection.query(testQuery, (err, results, fields) => {
    if (results.length == 0) {
      res.render("user", {
        title: "정보 입력",
      });
    } else {
      console.log("정보가 있는 유저입니다.");
      res.redirect("/daySelect");
    }
  });
});

router.post("/", (req, res) => {
  const height = req.body.height;
  const weight = req.body.weight;

  let testQuery = `INSERT INTO user_info (username, userHeight, userWeight) values ("${req.user.nickname}", ${height}, ${weight})`;
  // let testQuery = `INSERT INTO 'user_info' ('username', 'userHeight)`;

  connection.query(testQuery, (err, results, fields) => {
    if (err) {
      console.log(err);
    }
  });
  res.redirect("/daySelect");
  // res.redirect("/");
});

module.exports = router;
