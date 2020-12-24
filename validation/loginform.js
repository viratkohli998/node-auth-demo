const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validationSignIn(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.course = !isEmpty(data.course) ? data.course : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.country = !isEmpty(data.country) ? data.country : "";
  data.state = !isEmpty(data.state) ? data.state : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.phoneNo = !isEmpty(data.phoneNo) ? data.phoneNo : "";
  data.pinCode = !isEmpty(data.pinCode) ? data.pinCode : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : "";

  if (!validator.isLength(data.email, { min: 6, max: 40 })) {
    errors.email = "email Not valid ";
  }
  if (!validator.isLength(data.password, { min: 5, max: 100 })) {
    errors.password = "password must be 5 to 10 characters";
  }
  if (validator.isEmpty(data.address)) {
    errors.address = "address is required";
  }
  if (validator.isEmpty(data.state)) {
    errors.state = "state is required";
  }
  if (validator.isEmpty(data.country)) {
    errors.country = "country is required";
  }
  if (validator.isEmpty(data.city)) {
    errors.city = "city is required";
  }
  if (validator.isEmpty(data.course)) {
    errors.course = "course is required";
  }
  if (validator.isEmpty(data.name)) {
    errors.name = "name is required";
  }
  if (validator.isEmpty(data.phoneNo)) {
    errors.phoneNo = "phone number is required";
  }
  if (validator.isEmpty(data.pinCode)) {
    errors.pinCode = "pinCode is required";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "email is required";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "email is invalid";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "password is required";
  }
  if (validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "confirm password is required";
  }
  if (!validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "password do not match ";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
