const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function MenuValidation(data) {
  let errors = {};
  data.MName = !isEmpty(data.MName) ? data.MName : "";
  if (Validator.isEmpty(data.MName)) errors.MName = "Menu Name is required";

  data.price = !isEmpty(data.price) ? data.price : "";
  if (Validator.isEmpty(data.price)) errors.price = "Price is required";

  data.MCategory = !isEmpty(data.MCategory) ? data.MCategory : "";
  if (Validator.isEmpty(data.MCategory))
    errors.MCategory = "Menu Category is required";

  data.MStatus = !isEmpty(data.MStatus) ? data.MStatus : "";
  if (Validator.isEmpty(data.MStatus))
    errors.MStatus = "Menu Status is required";
//   if (!Validator.isInteger(data.Cost_Price))
//     errors.Cost_Price = "Cost Price should be in Number";
//   if (!Validator.isInteger(data.price))
//     errors.price = " Price should be in Number";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
