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

router.get("/", (req, res, next) => {
  testQuery = `SELECT * FROM userHealth WHERE username ="${req.user.nickname}"`;
  connection.query(testQuery, (err, results, fields) => {
    if (!err) {
      let myArr_mon = new Array();
      let myArr_tue = new Array();
      let myArr_wed = new Array();
      let myArr_thu = new Array();
      let myArr_fri = new Array();
      let myArr_sat = new Array();
      let myArr_sun = new Array();
      for (let i = 0; i < results.length; i++) {
        if (results[i].day == "월") {
          myArr_mon.push(results[i]);
        }
      }
      for (let i = 0; i < results.length; i++) {
        if (results[i].day == "화") {
          myArr_tue.push(results[i]);
        }
      }
      for (let i = 0; i < results.length; i++) {
        if (results[i].day == "수") {
          myArr_wed.push(results[i]);
        }
      }
      for (let i = 0; i < results.length; i++) {
        if (results[i].day == "목") {
          myArr_thu.push(results[i]);
        }
      }
      for (let i = 0; i < results.length; i++) {
        if (results[i].day == "금") {
          myArr_fri.push(results[i]);
        }
      }
      for (let i = 0; i < results.length; i++) {
        if (results[i].day == "토") {
          myArr_sat.push(results[i]);
        }
      }
      for (let i = 0; i < results.length; i++) {
        if (results[i].day == "일") {
          myArr_sun.push(results[i]);
        }
      }
      res.render("daySelect", {
        arr_mon: myArr_mon,
        arr_tue: myArr_tue,
        arr_wed: myArr_wed,
        arr_thu: myArr_thu,
        arr_fri: myArr_fri,
        arr_sat: myArr_sat,
        arr_sun: myArr_sun,
      });
    } else {
      console.log(err);
    }
  });
});


module.exports = router;
