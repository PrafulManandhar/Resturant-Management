const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const Router = require("../../config/Router");
const Errors = require("../../config/message").Errors;
const Success = require("../../config/message").Success;

const databaseOptions = require("../../config/database");
const mysqlConnection = mysql.createConnection(databaseOptions);
//Connect to database
mysqlConnection.connect();

//@route GET api/users/test
//@desc  Test users route
//@access Public
router.get("/test", (req, res) => res.json({ hi: "hello" }));

router.post(Router.ADD_OUTLET, (req, res) => {
    console.log("post outlet")
  let { outlet } = req.body;
  console.log("outlet",outlet)
  let Statement = "INSERT INTO outlet (T_name) VALUES (?)";

  mysqlConnection.query(Statement, outlet, (err, results) => {
      console.log("results",results)
    if (!err) {
      res.json({ type: "success", message: Success.ADD_OUTLET });
    } else {
      res.json({ type: "error", message: Errors.ADD_OUTLET });
    }
  });
});

module.exports = router;
