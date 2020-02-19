const express = require("express");
const router = express.Router();
const Router = require("../../config/Router");
const Errors = require("../../config/messages").Errors;
const Success = require("../../config/messages").Success;
const pool = require("../../config/pool").pool;

//@route GET api/users/test
//@desc  Test users route
//@access Public
router.get("/test", (req, res) => res.json({ hi: "hello" }));

router.post(Router.ADD_OUTLET, async (req, res) => {
  console.log("post outlet");
  let { outlet } = req.body;
  console.log("outlet", outlet);
  let Statement = "INSERT INTO outlet (T_name) VALUES (?)";
  return await pool
    .execute(Statement, [outlet])
    .then(result => {
      if (result[0].affectedRows > 0) {
        res.json({ type: "success", message: Success.ADD_OUTLET });
      } else {
        res.json({ type: "error", message: Errors.ADD_OUTLET });
      }
    })
    .catch(err => {
      console.log("error in adding outlet", err);
    });
});
//get the all the outlet
router.get(Router.GET_OUTLETS, async (req, res) => {
  console.log("post outlet");
  let Statement =
    "SELECT T_id AS id , T_name AS tname , T_status AS tstatus from outlet";
  return await pool
    .execute(Statement)
    .then(result => {
      console.log("results",result[0])
      if (result[0].length > 0) {
        res.json({ type: "success", data: result[0] });
      } else {
        res.json({ type: "error", message: Errors.VIEW_OUTLET });
      }
    })
    .catch(err => {
      console.log("error in getting the outlet", err);
      res.json({ type: "error", message: Errors.VIEW_OUTLET });
    });
});

//GET OUTLET FROM ID
router.get(Router.GET_OUTLET, async (req, res) => {
  let slug = req.params.slug;
  console.log(slug);
  if (!slug) {
    return res.json({ type: "error", message: "Failed to load category" });
  }
  let statement = "SELECT T_name FROM outlet WHERE T_id=?";
  return await pool
    .execute(statement, [slug])
    .then(result => {
      if (result[0].length > 0) {
        res.json({ type: "success", data: result[0] });
      } else {
        res.json({ type: "error", message: Errors.EDIT_OUTLET });
      }
    })
    .catch(err => {
      console.log("error in getting the outlet using id", err);
      res.json({ type: "error", message: Errors.EDIT_OUTLET });
    });
});

//Update OUTLET FROM ID
router.put(Router.UPDATE_OUTLET, async (req, res) => {
  let slug = req.params.slug;
  console.log(slug);
  if (!slug) {
    return res.json({ type: "error", message: "Failed to Update Outlet" });
  }
  let data = req.body.outlet;
  console.log(data);
  let statement = "UPDATE outlet SET T_name = ? WHERE T_id = ?";

  return await pool
    .execute(statement, [data, slug])
    .then(result => {
      if (result[0].affectedRows > 0) {
        res.json({ type: "success", message: Success.EDIT_OUTLET });
      } else {
        res.json({ type: "error", message: Errors.EDIT_OUTLET });
      }
    })
    .catch(err => {
      console.log("error in updateing the outlet", err);
      res.json({ type: "error", message: Errors.EDIT_OUTLET });
    });
});

//Delete OUTLET FROM ID
router.delete(Router.DELETE_OUTLET, async (req, res) => {
  let slug = req.params.slug;
  console.log(slug);
  if (!slug) {
    return res.json({ type: "error", message: "Failed to Delete Outlet" });
  }
  let statement = "Delete FROM outlet WHERE T_id=?";
  return await pool
    .execute(statement, [slug])
    .then(result => {
      if (result[0].affectedRows > 0) {
        res.json({ type: "success", message: Success.DELETE_OUTLET });
      } else {
        res.json({ type: "error", message: Errors.DELETE_OUTLET });
      }
    })
    .catch(err => {
      console.log("error in deletign the outlet", err);
      res.json({ type: "error", message: Errors.DELETE_OUTLET });
    });
});

module.exports = router;
