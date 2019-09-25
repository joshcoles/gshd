const Validator = require('validator');
const isEmpty = require('is-empty');

// https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669

const validateRegisterInput = (data) => {
  
  const errors = {};

  // Convert empty fields to an empty string so we can use functions from Validator package
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // Ensure that name is not empty
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  // Ensure that email is not empty and is proper format
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Ensure that passwords are:
  // - not empty
  // - of proper length
  // - matching
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors, 
    isValid: isEmpty(errors)
  };
};

module.exports = validateRegisterInput;