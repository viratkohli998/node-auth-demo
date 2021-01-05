
const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validationBlog(data ,file) {
  let errors = {};

  data.blogTitle = !isEmpty(data.blogTitle) ? data.blogTitle : "";
  data.blogContent = !isEmpty(data.blogContent) ? data.blogContent : "";

  if (validator.isEmpty(data.blogTitle)) {
    errors.blogTitle = "blog title is required";
  }
  if (validator.isEmpty(data.blogContent)) {
    errors.blogContent = "blogContent required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
