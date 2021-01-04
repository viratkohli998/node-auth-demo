
const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validationBlog(data) {
  let errors = {};

  data.blogTitle = !isEmpty(data.blogTitle) ? data.blogTitle : "";
  data.blogContent = !isEmpty(data.blogContent) ? data.blogContent : "";
  data.file = !isEmpty(data.req.files) ? data.req.files : "";

  if (validator.isEmpty(data.blogTitle)) {
    errors.blogTitle = "blog title is required";
  }
  if (validator.isEmpty(data.blogContent)) {
    errors.blogContent = "blogContent required";
  }

  if (validator.isEmpty(data.req.files)) {
    errors.file = "image is required";
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};
