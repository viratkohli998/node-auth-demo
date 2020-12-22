const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validationsignin(data) {
  let errors = {};
  data.Name = !isEmpty(data.Name) ? data.Name : "";
  data.PhoneNo = !isEmpty(data.PhoneNo) ? data.PhoneNo : "";
  data.Pincode = !isEmpty(data.Pincode) ? data.Pincode : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confimPassword = !isEmpty(data.confimPassword)
    ? data.confimPassword
    : "";

  if (!validator.isLength(data.email, { min: 6, max: 40 })) {
    errors.email = "Email Not valid ";
  }
  if (!validator.isLength(data.password, { min: 5, max: 100 })) {
    errors.password = "password must be 5 to 10 charecters ";
  }
  if (validator.isEmpty(data.Name)) {
    errors.Name = "Name Reqiuerd";
  }
  if (validator.isEmpty(data.PhoneNo)) {
    errors.PhoneNo = "PhoneNo Reqiuerd";
  }
  if (validator.isEmpty(data.Pincode)) {
    errors.Pincode = "Pincode Reqiuerd";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "email Filed Reqiuerd";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "password Reqiuerd";
  }
  if (validator.isEmpty(data.confimPassword)) {
    errors.confimPassword = "confimPassword Filed Reqiuerd";
  }
  if (!validator.equals(data.password, data.confimPassword)) {
    errors.confimPassword = "PassWord Not Match ";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
