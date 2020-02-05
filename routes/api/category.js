const express = require("express");
const router = express.Router();
const Router = require("../../config/Router");
const Errors = require("../../config/message").Errors;
const Success = require("../../config/message").Success;
// const databaseUtility = require("../../utility/databaseUtility");
// var moment = require("moment""");
// const databaseUtility = require("../../utility/databaseUtility");

const pool = require("../../config/pool").pool;

//@route GET api/users/test
//@desc  Test users route
//@access Public
router.get("/test", (req, res) => res.json({ hi: "hello" }));

//addCategory

addCategory = async ({ category }) => {
  console.log("addCateroga ",category)
  let Statement = "INSERT INTO category (C_name) VALUES (?)";
  return pool
    .execute(Statement, [category])
    .then(results => {
      if (results[0].affectedRows > 0) {
        return { categoryAdded: true };
      }
    })
    .catch(err => {
      return { categoryAdded: false, err };
    });
};

router.post(Router.ADD_CATEGORY, async (req, res) => {
  let category = req.body.category;
  console.log("addCategory",category)


  let { categoryAdded, err } = await addCategory({ category });
  if (categoryAdded) {
    res.json({ type: "success", message: Success.ADD_CATEGORY });
  } else {
    if (err && err.code === "ER_DUP_ENTRY") {
      let errors = {};
      // errors.category = Errors.CATEGORY_DUPLICATE;
      res.status(400).json({ errors });
    } else {
      res.json({ type: "error", message: Errors.ADD_CATEGORY });
    }
  }
});

router.get(Router.MANAGE_CATEGORIES, (req, res) => {
  let Statement = "SELECT C_id AS id , C_name AS cnames from category";

  mysqlConnection.query(Statement, (err, results) => {
    console.log("results", results);
    if (!err) {
      res.json({ type: "success", data: results });
    } else {
      res.json({ type: "error", message: Errors.VIEW_CATEGORY });
    }
  });
});

//GET OUTLET FROM ID
router.get(Router.GET_CATEGORY, (req, res) => {
  let slug = req.params.slug;
  console.log(slug);
  if (!slug) {
    return res.json({ type: "error", message: "Failed to load category" });
  }
  
  let statement = "SELECT C_name FROM category WHERE C_id=?";

  mysqlConnection.query(statement, slug, (err, result) => {
    if (!err) {
      console.log(result);
      res.json({ type: "success", data: result });
    } else {
      res.json({ type: "error", message: Errors.VIEW_CATEGORY });
    }
  });
});

//Update OUTLET FROM ID
router.put(Router.UPDATE_CATEGORY, (req, res) => {
  let slug = req.params.slug;
  console.log(slug);
  if (!slug) {
    return res.json({ type: "error", message: "Failed to Update Category" });
  }
  let data = req.body.category;
  console.log(data);
  let statement = "UPDATE category SET C_name = ? WHERE C_id = ?";

  mysqlConnection.query(statement, [data, slug], (err, result) => {
    if (!err) {
      console.log(result);
      res.json({ type: "success", message: Success.EDIT_CATEGORY });
    } else {
      res.json({ type: "error", message: Errors.EDIT_CATEGORY });
    }
  });
});

//Delete OUTLET FROM ID
router.delete(Router.DELETE_CATEGORY, (req, res) => {
  let slug = req.params.slug;
  console.log(slug);
  if (!slug) {
    return res.json({ type: "error", message: "Failed to Delete category" });
  }
  let statement = "Delete FROM category WHERE C_id=?";

  mysqlConnection.query(statement, [slug], (err, result) => {
    console.log("affected");
    if (!err) {
      res.json({ type: "success", message: Success.DELETE_CATEGORY });
    } else {
      res.json({ type: "error", message: Errors.DELETE_CATEGORY });
    }
  });
});

module.exports = router;
