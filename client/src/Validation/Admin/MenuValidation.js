const Validator = require("validator");
const isEmpty = require("../isEmpty");

export default data=> {
  console.log("menuValidation",data)
  let errors = {};
  data.MName = !isEmpty(data.MName) ? data.MName : "";
  if (Validator.isEmpty(data.MName)) errors.MName = "Menu Name is required";

  // data.Price = !isEmpty(data.Price) ? data.Price : "";
  // if (Validator.isEmpty(data.Price)) errors.Price = "Price is required";

  data.MCategory = !isEmpty(data.MCategory) ? data.MCategory : "";
  if (Validator.isEmpty(data.MCategory))
    errors.MCategory = "Menu Category is required";

  data.MStatus = !isEmpty(data.MStatus) ? data.MStatus : "";
  if (Validator.isEmpty(data.MStatus))
    errors.MStatus = "Menu Status is required";

// if(!Validator.isNumber(data.Cost_Price))
//     errors.Cost_Price= "Cost Price should be in Number"
//     if(!Validator.isNumber(data.Price))
//     errors.Price= " Price should be in Number"
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
