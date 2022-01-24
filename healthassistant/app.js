const express = require("express");
const app = express();
const sslport = 23023;
const passport = require("passport");
const index = require("./routes/index");
const user = require("./routes/user");
const path = require("path");
const setup = require("./routes/setup");
const daySelect = require("./routes/daySelect");
const otherUser = require("./routes/otherUser");
const myHealth = require("./routes/myHealth");

passport.serializeUser(function (user, done) {
  console.log("serialized");
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  console.log("deserialized");
  done(null, user);
});

app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(passport.initialize());
app.use("/", index);
app.use("/user", user);
app.use("/setup", setup);
app.use("/daySelect", daySelect);
app.use("/otherUser", otherUser);
app.use("/myHealth", myHealth);
app.use("/static", express.static("./js/"));

app.listen(sslport, () => {
  console.log(`Example app listening at www.2018102224.osschatbot.cf:${sslport}`);
  //도메인 입력
});

module.exports = app;
