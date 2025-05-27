// model/db.js
var mysql = require("mysql");

var pool = mysql.createPool({
    host: "tuxa.sme.utc", // ou localhost
    user: "sr10p068",
    password: "LygxS7uCb0fC",
    database: "sr10p068"
});

module.exports = pool;
