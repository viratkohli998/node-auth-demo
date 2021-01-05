const blog = require("../models/blog");
const validationBlog = require("../validation/blog");
const isEmpty = require("../validation/is-empty");

exports.getAllBlog = function (req, res) {
  blog
    .find()
    .then((results) => {
      res.status(201).json({
        message: "get all blog successfully",
        blogList: results,
      });
    })
    .catch((err) => {
      res.status(504).json({
        message: "blog not found",
      });
    });
};

exports.createBlog = async (req, res) => {
  const { errors, isValid } = validationBlog(req.body, req.files);
  if (!isValid) {
    return res.status(201).json(errors);
  }
  if (isEmpty(req.files)) {
    return res.status(201).json({
      message: "Only file is allowed",
    });
  }
  req.body.userId = req.user.id;
  req.body.blogCreatedBy = req.user.name;
  req.body.blogImagePath = req.files[0].filename;
  await blog
    .create(req.body)
    .catch((err) => {
      return res.status(200).json({
        message: "Please enter valid data",
      });
    })
    .then((results) => {
      return res.status(200).json({
        ResponseStatus: 0,
        message: "Blog create successfully",
      });
    });
};

exports.deleteBlog = function (req, res) {
  blog
    .findByIdAndRemove(req.params.id)
    .then((results) => {
      res.status(201).json({
        ResponseStatus: 0,
        message: "delete blog successfully",
      });
    })
    .catch((err) => {
      res.status(504).json({
        message: "Not Found",
      });
    });
};

exports.getBlogById = function (req, res) {
  blog
    .find({ userId: req.user.id })
    .then((results) => {
      res.status(201).json({
        ResponseStatus: 0,
        blog: results,
        message: "get blog successfully",
      });
    })
    .catch((err) => {
      res.status(504).json({
        message: "Not Found",
      });
    });
};

exports.blogCommit = function (req, res) {
  blog
    .findOne({ _id: req.params.id })
    .then((results) => {
      if (!isEmpty(results)) {
        var data;
        if (results.blogComment && results.blogComment.length > 0) {
          data = {
            blogComment: [req.body.blogComment, ...results.blogComment],
          };
        } else {
          data = {
            blogComment: [req.body.blogComment],
          };
        }
        blog
          .findOneAndUpdate({ _id: req.params.id }, data)
          .then((results) => {
            res.status(200).json({
              ResponseStatus: 0,
              message: "blog commit successfully",
            });
          })
          .catch((err) => {
            res.status(504).json({
              message: "Not Found",
            });
          });
      } else {
        res.status(504).json({
          message: "blog not exist",
        });
      }
    })
    .catch((err) => {
      res.status(504).json({
        message: "blog not exist",
      });
    });
};

exports.blogLike = async (req, res) => {
  await blog.findOne({ _id: req.params.id }).then((results) => {
    if (!isEmpty(results)) {
      const isUserIdExist = results.blogLike.filter((x) => x == req.user.id);
      if (isUserIdExist && isUserIdExist.length === 0) {
        const dataLike = {
          blogLike: [...results.blogLike, req.user.id],
        };
        blog
          .findOneAndUpdate({ _id: req.params.id }, dataLike)
          .then(async (results) => {
            await res.status(200).json({
              ResponseStatus: 0,
              message: "blog is liked",
            });
            const myArray = results.blogDislike.filter(
              (x) => x !== req.user.id
            );
            const disLike = {
              blogDislike: myArray,
            };
            await blog.updateOne({ _id: req.params.id }, disLike);
          })
          .catch((err) => {
            res.status(504).json({
              message: "Not Found",
            });
          });
      } else {
        res.status(202).json({
          message: "blog is already liked",
        });
      }
    } else {
      res.status(504).json({
        message: "blog not exist",
      });
    }
  });
};

exports.blogDisLike = async (req, res) => {
  await blog.findOne({ _id: req.params.id }).then((results) => {
    if (!isEmpty(results)) {
      const isUserIdExist = results.blogDislike.filter(
        (x) => x === req.user.id
      );
      if (isUserIdExist && isUserIdExist.length === 0) {
        const dataDisLike = {
          blogDislike: [...results.blogDislike, req.user.id],
        };
        blog
          .findOneAndUpdate({ _id: req.params.id }, dataDisLike)
          .then(async (results) => {
            await res.status(200).json({
              ResponseStatus: 0,
              message: "blog is disliked",
            });
            const myArray = results.blogLike.filter((x) => x !== req.user.id);
            const like = {
              blogLike: myArray,
            };
            console.log(like);
            await blog.updateOne({ _id: req.params.id }, like);
          })
          .catch((err) => {
            res.status(504).json({
              message: "Not Found",
            });
          });
      } else {
        res.status(202).json({
          message: "blog is already disliked",
        });
      }
    } else {
      res.status(504).json({
        message: "blog not exist",
      });
    }
  });
};
