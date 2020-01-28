const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const Router = require("../../config/Router");
const Errors = require("../../config/message").Errors;
const Success = require("../../config/message").Success;
const ValidateMenu =require("../../Validation/MenuValidation");
const databaseOptions = require("../../config/database");
const mysqlConnection = mysql.createConnection(databaseOptions);
//Connect to database
mysqlConnection.connect();

//@route GET api/users/test
//@desc  Test users route
//@access Public
router.get("/test", (req, res) => res.json({ hi: "hello" }));



//Add new Menu
//Method : Post
router.post(Router.ADD_MENU, (req, res) => {
  let { MName, MCategory, price, MStatus, Cost_Price, Description } = req.body;
  Cost_Price = Cost_Price ? Cost_Price : 0;
  Description = Description ? Description : "";

  let {errors,isValid} = ValidateMenu(req.body);
  if(isValid){
    let Statement = "INSERT INTO menu (M_name, M_status, M_category, price , cost_price , description) VALUES (?,?,?,?,?,?)";

    mysqlConnection.query(Statement, [MName,MStatus,MCategory,price,Cost_Price,Description], (err, results) => {
      console.log("results", err);
      if (!err && results.affectedRows>0) {
        res.json({ type: "success", message: Success.ADD_MENU });
      } else {
        res.json({ type: "error", message: Errors.ADD_MENU });
      }
    })
  }else{
      res.json({errors})
  }
  
});

//Get all the menu for Viewing 
//Method Post 
router.get(Router.MANAGE_MENU, (req, res) => {
  let Statement = "SELECT M_id AS M_id , M_name AS MName ,M_status AS MStatus ,M_category AS MCategory, price AS Price , cost_price AS CPrice , description AS Decsription from menu";

  mysqlConnection.query(Statement, (err, results) => {
    console.log("results", results);
    if (!err) {
      res.json({ type: "success", data: results });
    } else {
      res.json({ type: "error", message: Errors.VIEW_MENU });
    }
  });
});

//GET OUTLET FROM ID
router.get(Router.GET_MENU, (req, res) => {
  let slug = req.params.slug;
  console.log(slug);
  if (!slug) {
    return res.json({ type: "error", message: "Failed to load menu" });
  }
  let statement = "SELECT M_name AS MName , M_category AS MCategory,M_status AS MStatus ,price AS Price , cost_price AS CPrice , description AS Description FROM menu WHERE M_id=?; Select C_name from category WHERE C_id=(SELECT M_category from menu where M_id = ?)";

  mysqlConnection.query(statement, [slug,slug], (err, result) => {
    console.log("resultsfafafa",result[0])
    console.log("results",result[1])
   let data={
      MName:result[0][0].MName,
      MCategory:result[1][0].C_name,
      Price:result[0][0].Price,
      CPrice:result[0][0].CPrice,
      Decsription:result[0][0].Description,
      MStatus:result[0][0].MStatus
    }
    console.log(data)
    if (!err) {
      console.log("update resyult",result[0].MCategory)
      res.json({ type: "success", data: data });
    } else {
      res.json({ type: "error", message: Errors.VIEW_MENU });
    }
  });
});

//Update OUTLET FROM ID
router.put(Router.UPDATE_MENU, (req, res) => {
  let slug = req.params.slug;
  if (!slug) {
    return res.json({ type: "error", message: "Failed to Update menu" });
  }
  let { MName, MCategory, Price, MStatus, Cost_Price, Description } = req.body;
  Cost_Price = Cost_Price ? Cost_Price : 0;
  Description = Description ? Description : "";
  let {errors,isValid} = ValidateMenu(req.body);
  
  if(isValid){
  let statement = "UPDATE menu SET M_name = ? , M_status = ? , M_category = ? , price = ? , cost_price = ? , description = ? WHERE M_id = ?";

  mysqlConnection.query(statement, [MName,MStatus,MCategory,Price,Cost_Price,Description, slug], (err, result) => {
    console.log("err",err)
    console.log("result",result)
    if (!err && result.affectedRows>0) {
      console.log(result);
      res.json({ type: "success", message: Success.EDIT_MENU });
    } else {
      res.json({ type: "error", message: Errors.EDIT_MENU });
    }
  });
}else{
    res.json({errors})
}
});

//Delete OUTLET FROM ID
router.delete(Router.DELETE_MENU, (req, res) => {
  console.log("react")
  let slug = req.params.slug;
  console.log(slug);
  if (!slug) {
    return res.json({ type: "error", message: "Failed to Delete menu" });
  }
  let statement = "Delete FROM menu WHERE M_id=?";

  mysqlConnection.query(statement, [slug], (err, result) => {
    console.log("affected", result.affectedRows);
    if (!err && result.affectedRows > 0) {
      res.json({ type: "success", message: Success.DELETE_MENU });
    } else {
      res.json({ type: "error", message: Errors.DELETE_MENU });
    }
  });
});

module.exports = router;
