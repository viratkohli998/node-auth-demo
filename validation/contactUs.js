const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validationContactUs(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";

  if (validator.isEmpty(data.name)) {
    errors.name = "name is required";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "email required";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "email is invalid";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
