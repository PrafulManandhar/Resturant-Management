const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const databaseOptions = require("../../config/database");
const mysqlConnection = mysql.createConnection(databaseOptions);
//Connect to database
mysqlConnection.connect();

//@route GET api/users/test
//@desc  Test users route
//@access Public
router.get("/test", (req, res) => res.json({ hi: "hello" }));

module.exports = router;
