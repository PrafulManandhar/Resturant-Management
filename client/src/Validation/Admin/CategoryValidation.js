const Validator = require("validator");
const isEmpty = require("../isEmpty");

export default data => {
  let errors = {};
  data.category = !isEmpty(data.category) ? data.category : "";
  if (Validator.isEmpty(data.category))
    errors.category = "category is required";
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
