const express = require("express");
const router = express.Router();
// const mysql = require("mysql");
const Router = require("../../config/Router");
const Errors = require("../../config/messages").Errors;
const Success = require("../../config/messages").Success;
const ValidateMenu =require("../../Validation/MenuValidation");
// const databaseOptions = require("../../config/database");
// const mysqlConnection = mysql.createConnection(databaseOptions);
const pool = require("../../config/pool").pool;

//Connect to database
// mysqlConnection.connect();

//@route GET api/users/test
//@desc  Test users route
//@access Public
router.get("/test", (req, res) => res.json({ hi: "hello" }));



//Add new Menu
//Method : Post
router.post(Router.ADD_MENU, async(req, res) => {
  let { MName, MCategory, Price, MStatus, Cost_Price, Description } = req.body;
  Cost_Price = Cost_Price ? Cost_Price : 0;
  Description = Description ? Description : "";
  console.log(req.body)
  let {errors,isValid} = ValidateMenu(req.body);
  if(isValid){
    let Statement = "INSERT INTO menu (M_name, M_status, M_category, Price , cost_price , description) VALUES (?,?,?,?,?,?)";
    
    return await pool.execute(Statement,[MName,MStatus,MCategory,Price,Cost_Price,Description]).then(result=>{
      if(result[0].affectedRows>0){
        res.json({ type: "success", message: Success.ADD_MENU });

      }else{
        res.json({ type: "error", message: Errors.ADD_MENU });

      }
    }).catch(err=>{
      console.log("error in adding the menu",err)
    })
  }else{
      res.json({errors})
  }
  
});

//Get all the menu for Viewing 
//Method Post 
router.get(Router.MANAGE_MENU, async(req, res) => {
  let Statement = "SELECT M_id AS M_id , M_name AS MName ,M_status AS MStatus ,M_category AS MCategory, Price AS Price , cost_price AS CPrice , description AS Decsription from menu";

  return await pool.execute(Statement).then(results=>{
    console.log("results",results[0].length)
    if(results[0].length){
      res.json({type:"success" , data:results[0]})
    }else{
      res.json({type:"error" , message:Errors.GET_MENU})

    }
  }).catch(err=>{
    console.log("error in getting the menu",err)

    res.json({type:"error" , message:Errors.GET_MENU})

  })
});

//GET OUTLET FROM ID
router.get(Router.GET_MENU, (req, res) => {
  let slug = req.params.slug;
  console.log(slug);
  if (!slug) {
    return res.json({ type: "error", message: "Failed to load menu" });
  }
  let statement = "SELECT M_name AS MName,M_status AS MStatus ,Price AS Price , cost_price AS CPrice , description AS Description FROM menu WHERE M_id=?; Select C_name from category WHERE C_id=(SELECT M_category from menu where M_id = ?)";

  mysqlConnection.query(statement, [slug,slug], (err, result) => {
   let data={
      MName:result[0][0].MName,
      MCategory:result[1][0].C_name,
      Price:result[0][0].Price,
      CPrice:result[0][0].CPrice,
      Description:result[0][0].Description,
      MStatus:result[0][0].MStatus
    }
    console.log(data)
    if (!err) {
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
  console.log("data inside Update",req.body)
  if(isValid){
  let statement = "UPDATE menu SET M_name = ? , M_status = ? , M_category = ? , Price = ? , cost_price = ? , description = ? WHERE M_id = ?";

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
