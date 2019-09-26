const Validator = require("validator");
const isEmpty = require("is-empty");

const validateLoginInput = (data) => {
  const errors = {};

  // Convert empty fields to an empty string so we can use functions from Validator package
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  
  // Ensure that email is not empty and is proper format
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  
  // Ensure that password is not empty
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateLoginInput;