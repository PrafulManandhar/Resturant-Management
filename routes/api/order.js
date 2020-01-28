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

  mysqlConnection.query(Statement, [outlet], (err, results) => {
      console.log("results",results)
    if (!err) {
      res.json({ type: "success", message: Success.ADD_OUTLET });
    } else {
      res.json({ type: "error", message: Errors.ADD_OUTLET });
    }
  });
});

router.get(Router.GET_OUTLETS, (req, res) => {
  console.log("post outlet")
let Statement = "SELECT T_id AS id , T_name AS tname , T_status AS tstatus from outlet";

mysqlConnection.query(Statement, (err, results) => {
    console.log("results",results)
  if (!err) {
    res.json({ type: "success", data: results });
  } else {
    res.json({ type: "error", message: Errors.View_OUTLET });
  }
});
});


//GET OUTLET FROM ID
router.get(Router.GET_OUTLET,(req,res)=>{
  let slug= req.params.slug;
  console.log(slug)
  if (!slug) {
    return res.json({ type: "error", message: "Failed to load category" });
  }
  let statement = "SELECT T_name FROM outlet WHERE T_id=?"

  mysqlConnection.query(statement,[slug],(err,result)=>{
    if(!err){
      console.log(result)
      res.json({type:"success" , data:result})
    }else {
      res.json({ type: "error", message: Errors.Edit_OUTLET });
    }
  })
  })

  //Update OUTLET FROM ID
router.put(Router.UPDATE_OUTLET,(req,res)=>{
  let slug= req.params.slug;
  console.log(slug)
  if (!slug) {
    return res.json({ type: "error", message: "Failed to Update Outlet" });
  }
  let data=req.body.outlet;
  console.log(data)
  let statement = "UPDATE outlet SET T_name = ? WHERE T_id = ?"

  mysqlConnection.query(statement,[data,slug],(err,result)=>{
    if(!err){
      console.log(result)
      res.json({type:"success" ,  message: Success.EDIT_OUTLET})
    }else {
      res.json({ type: "error", message: Errors.EDIT_OUTLET });
    }
  })
  })


   //Delete OUTLET FROM ID
router.delete(Router.DELETE_OUTLET,(req,res)=>{
  let slug= req.params.slug;
  console.log(slug)
  if (!slug) {
    return res.json({ type: "error", message: "Failed to Delete Outlet" });
  }
  let statement = "Delete FROM outlet WHERE T_id=?"

  mysqlConnection.query(statement,[slug],(err,result)=>{
    console.log("affected",result.affectedRows)
    if(!err && result.affectedRows>0){
      res.json({type:"success" ,  message: Success.DELETE_OUTLET})
    }else {
      res.json({ type: "error", message: Errors.DELETE_OUTLET});
    }
  })
  })



module.exports = router;
