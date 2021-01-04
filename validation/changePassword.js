const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validationChangePassword(data) {
  let errors = {};

  data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : "";
  data.oldPassword = !isEmpty(data.oldPassword) ? data.oldPassword : "";

  if (validator.isEmpty(data.newPassword)) {
    errors.newPassword = "new password required";
  }

  if (validator.isEmpty(data.oldPassword)) {
    errors.oldPassword = "old password required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
