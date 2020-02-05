const express = require("express");
const router = express.Router();
const passport = require("passport");
const pool = require("../../../config/pool").pool;
const Actions = require("../../../config/messages").Actions;
const Roles = require("../../../config/roles");
const Errors = require("../../../config/messages").Errors;
const Success = require("../../../config/messages").Success;
const databaseUtility = require("../../../utility/databaseUtility");
const ROUTES = require("../../../config/route");

getProductsRequiringReorder = async () => {
  let statement = `SELECT p_name AS "name",quantity,reorder_level AS reorderLevel FROM product WHERE reorder_level>=quantity ;`;
  return await pool
    .execute(statement)
    .then(results => {
      return results[0];
    })
    .catch(err => console.log(err));
};

//@route GET api/notification/
//@desc Retrieve all categories
//@access Private
router.get(
  ROUTES.GET_NOTIFICATIONS,
  //  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    res.json(await getProductsRequiringReorder());
  }
);

module.exports = router;
