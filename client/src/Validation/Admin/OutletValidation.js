const Validator = require("validator");
const isEmpty = require("../isEmpty");

export default data => {
  let errors = {};
  data.outlet = !isEmpty(data.outlet) ? data.outlet : "";
  if (Validator.isEmpty(data.outlet))
    errors.outlet = "Outlet is required";
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
