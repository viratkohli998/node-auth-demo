const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validationregistation(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.Address = !isEmpty(data.name) ? data.Address : "";
  data.phoneNumber = !isEmpty(data.name) ? data.phoneNumber : "";

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 charecters ";
  }
  if (!validator.isLength(data.phoneNumber, { min: 10, max: 10 })) {
    errors.name = "phoneNumber must be 10 charecters ";
  }
  if (validator.isEmpty(data.name)) {
    errors.name = "Name Filed Reqiuerd";
  }
  if (validator.isEmpty(data.Address)) {
    errors.Address = "Address Filed Reqiuerd";
  }
  if (validator.isEmpty(data.phoneNumber)) {
    errors.phoneNumber = "phoneNumber Filed Reqiuerd";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
