const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validationUpdateProfile(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.course = !isEmpty(data.course) ? data.course : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.country = !isEmpty(data.country) ? data.country : "";
  data.state = !isEmpty(data.state) ? data.state : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.phoneNo = !isEmpty(data.phoneNo) ? data.phoneNo : "";
  data.pinCode = !isEmpty(data.pinCode) ? data.pinCode : "";

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
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
