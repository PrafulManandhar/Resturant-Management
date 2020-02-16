const express = require("express");
const router = express.Router();
// const mysql = require("mysql");
const Router = require("../../config/Router");
const Errors = require("../../config/messages").Errors;
const Success = require("../../config/messages").Success;
const ValidateMenu = require("../../Validation/MenuValidation");
// const databaseOptions = require("../../config/database");
// const mysqlConnection = mysql.createConnection(databaseOptions);
const pool = require("../../config/pool").pool;

getCategoryName = async () => {
  const connection = await pool.getConnection();
  let Statement =
    "SELECT C_name from category INNER JOIN menu ON  category.C_id = menu.M_category ";
  return await pool
    .execute(Statement)
    .then(result => {
      console.log("getCategoryName", result[0]);
      return result[0];
    })
    .catch(err => {
      console.log("error getting the Category Name", err);
    });
};
getCategoryNameById = async(slug) =>{
  let Statement =
    "SELECT C_name from category INNER JOIN menu ON  category.C_id = menu.M_category WHERE menu.M_id = ? ";
  return await pool
    .execute(Statement,slug)
    .then(result => {
      console.log("getCategoryName", result[0]);
      return result[0];
    })
    .catch(err => {
      console.log("error getting the Category Name", err);
    });
}

getMenu = async () => {
  let Statement =
    "SELECT M_id AS M_id , M_name AS MName ,M_status AS MStatus, Price AS Price , cost_price AS CPrice , description AS Decsription from menu";
  return await pool
    .execute(Statement)
    .then(result => {
      return result[0];
    })
    .catch(err => {
      console.log(
        "error getting the Menu other than category name in menu",
        err
      );
    });
};

getMenuById = async (slug) => {
  let Statement =
    "SELECT M_id AS M_id , M_name AS MName ,M_status AS MStatus, Price AS Price , cost_price AS CPrice , description AS Decsription from menu WHERE M_id=?";
  return await pool
    .execute(Statement,slug)
    .then(result => {
      return result[0];
    })
    .catch(err => {
      console.log(
        "error getting the Menu other than category name in menu",
        err
      );
    });
};

//Add new Menu
//Method : Post
router.post(Router.ADD_MENU, async (req, res) => {
  let { MName, MCategory, Price, MStatus, Cost_Price, Description } = req.body;
  Cost_Price = Cost_Price ? Cost_Price : 0;
  Description = Description ? Description : "";
  console.log(req.body);
  let { errors, isValid } = ValidateMenu(req.body);
  if (isValid) {
    let Statement =
      "INSERT INTO menu (M_name, M_status, M_category, Price , cost_price , description) VALUES (?,?,?,?,?,?)";

    return await pool
      .execute(Statement, [
        MName,
        MStatus,
        MCategory,
        Price,
        Cost_Price,
        Description
      ])
      .then(result => {
        if (result[0].affectedRows > 0) {
          res.json({ type: "success", message: Success.ADD_MENU });
        } else {
          res.json({ type: "error", message: Errors.ADD_MENU });
        }
      })
      .catch(err => {
        console.log("error in adding the menu", err);
      });
  } else {
    res.json({ errors });
  }
});

//Get all the menu for Viewing
//Method Post
router.get(Router.MANAGE_MENU, async (req, res) => {
  let CategoryName = await getCategoryName();
  let Menu = await getMenu();

  console.log("Menu",Menu)
  let data = [];
  for (let i = 0; i < CategoryName.length; i++) {
    data.push({
      M_id:Menu[i].M_id,
      MName: Menu[i].MName,
      MCategory: CategoryName[i].C_name,
      Price: Menu[i].Price,
      CPrice: Menu[i].CPrice,
      Decsription: Menu[i].Decsription,
      MStatus: Menu[i].MStatus
    });
  }

  if (CategoryName && Menu) {
    res.json({ type: "success", data: data });
  } else {
    res.json({ type: "error", message: Errors.GET_MENU });
  }
});

//GET OUTLET FROM ID
router.get(Router.GET_MENU, async (req, res) => {
  let slug = req.params.slug;
  console.log(slug);
  if (!slug) {
    return res.json({ type: "error", message: "Failed to load menu" });
  }
  // let CategoryNameById = await getCategoryNameById(slug);
  // let MenuById = await getMenuById(slug);
  // console.log("CategoryNameById",CategoryNameById)
  let statement =
    "SELECT M_name AS MName,M_status AS MStatus ,Price AS Price , cost_price AS CPrice , description AS Description FROM menu WHERE M_id=?";
  //Select C_name from category WHERE C_id=(SELECT M_category from menu where M_id = ?)
  return await pool
    .execute(statement, [slug])
    .then(result => {
      // console.log("data",result[0])
      // let data={
      //   MName:result[0].MName,
      //   // MCategory:result[1][0].C_name,
      //   Price:result[0].Price,
      //   CPrice:result[0].CPrice,
      //   Description:result[0].Description,
      //   MStatus:result[0].MStatus
      // }
      // console.log("data of getting menu",data)
      res.json({ type: "success", data: result[0] });
    })
    .catch(err => {
      console.log("error in eding the menu", err);
      res.json({ type: "error", message: Errors.VIEW_MENU });
    });
  // mysqlConnection.query(statement, [slug,slug], (err, result) => {
  //  let data={
  //     MName:result[0][0].MName,
  //     MCategory:result[1][0].C_name,
  //     Price:result[0][0].Price,
  //     CPrice:result[0][0].CPrice,
  //     Description:result[0][0].Description,
  //     MStatus:result[0][0].MStatus
  //   }
  //   console.log(data)
  //   if (!err) {
  //     res.json({ type: "success", data: data });
  //   } else {
  //     res.json({ type: "error", message: Errors.VIEW_MENU });
  //   }
  // });
});

//Update OUTLET FROM ID
router.put(Router.UPDATE_MENU, async (req, res) => {
  let slug = req.params.slug;
  if (!slug) {
    return res.json({ type: "error", message: "Failed to Update menu" });
  }
  let { MName, MCategory, Price, MStatus, Cost_Price, Description } = req.body;
  Cost_Price = Cost_Price ? Cost_Price : 0;
  Description = Description ? Description : "";
  let { errors, isValid } = ValidateMenu(req.body);
  console.log("data inside Update", req.body);
  if (isValid) {
    let statement =
      "UPDATE menu SET M_name = ? , M_status = ? , M_category = ? , Price = ? , cost_price = ? , description = ? WHERE M_id = ?";

    return await pool
      .execute(statement, [
        MName,
        MStatus,
        MCategory,
        Price,
        Cost_Price,
        Description,
        slug
      ])
      .then(result => {
        if (result[0].affectedRows > 0) {
          res.json({ type: "success", message: Success.EDIT_MENU });
        } else {
          res.json({ type: "error", message: Errors.EDIT_MENU });
        }
      })
      .catch(err => {
        console.log("error in edititng tht menu");
        res.json({ type: "error", message: Errors.EDIT_MENU });
      });
    // mysqlConnection.query(statement, [MName,MStatus,MCategory,Price,Cost_Price,Description, slug], (err, result) => {
    //   console.log("err",err)
    //   console.log("result",result)
    //   if (!err && result.affectedRows>0) {
    //     console.log(result);
    //     res.json({ type: "success", message: Success.EDIT_MENU });
    //   } else {
    //     res.json({ type: "error", message: Errors.EDIT_MENU });
    //   }
    // });
  } else {
    res.json({ errors });
  }
});

//Delete OUTLET FROM ID
router.delete(Router.DELETE_MENU, async (req, res) => {
  console.log("react");
  let slug = req.params.slug;
  console.log(slug);
  if (!slug) {
    return res.json({ type: "error", message: "Failed to Delete menu" });
  }
  let statement = "Delete FROM menu WHERE M_id=?";

  return await pool
    .execute(statement, [slug])
    .then(results => {
      if (results[0].affectedRows > 0) {
        res.json({ type: "success", message: Success.DELETE_MENU });
      } else {
        res.json({ type: "error", message: Errors.DELETE_MENU });
      }
    })
    .catch(err => {
      console.log("error in deleting the menu idem");
      res.json({ type: "error", message: Errors.DELETE_MENU });
    });
});

//Update Available to stockout FROM ID
router.put(Router.UPDATE_TO_STOCKOUT, async (req, res) => {
  console.log("availble slug");

  let slug = req.params.slug;
  if (!slug) {
    return res.json({ type: "error", message: "Failed to Update Stock" });
  }
  console.log("availble slug", slug);

  let statement = "UPDATE menu SET M_status = ? WHERE M_id = ?";

  return await pool
    .execute(statement, ["Stock-out", slug])
    .then(result => {
      if (result[0].affectedRows > 0) {
        res.json({ type: "success", message: Success.STOCK_UPDATED });
      } else {
        res.json({ type: "error", message: Errors.STOCK_UPDATED_FAILED });
      }
    })
    .catch(err => {
      console.log("error in update tht menu");
      res.json({ type: "error", message: Errors.STOCK_UPDATED_FAILED });
    });
});

//Update stockout to availbel FROM ID
router.put(Router.UPDATE_TO_AVAILABLE, async (req, res) => {
  let slug = req.params.slug;
  console.log("availble slug", slug);
  if (!slug) {
    return res.json({ type: "error", message: "Failed to Update Stock" });
  }

  let statement = "UPDATE menu SET M_status = ? WHERE M_id = ?";

  return await pool
    .execute(statement, ["available", slug])
    .then(result => {
      if (result[0].affectedRows > 0) {
        res.json({ type: "success", message: Success.STOCK_UPDATED });
      } else {
        res.json({ type: "error", message: Errors.STOCK_UPDATED_FAILED });
      }
    })
    .catch(err => {
      console.log("error in update tht menu");
      res.json({ type: "error", message: Errors.STOCK_UPDATED_FAILED });
    });
});

module.exports = router;
