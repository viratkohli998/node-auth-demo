const blog = require("../models/blog");
const validationBlog = require("../validation/blog")

exports.getAllBlog = function (req, res) {
    blog
        .find()
        .then(results => {
            res.status(201).json({
                message: "get all blog successfully",
                blogList: results
            });
        })
        .catch(err => {
            res.status(504).json({
                message: "blog not found"
            });
        });
};

exports.createBlog = function (req, res) {
    const { errors, isValid } = validationBlog(req.body);
    if (!isValid) {
        return res.status(201).json(errors);
    }
    req.body.userId = req.user.id
    req.body.blogCreatedBy = req.user.name
    blog
        .create(req.body)
        .catch(err => {
            return res.status(200).json({
                message: "Please enter valid data"
            });
        })
        .then(results => {
            return res.status(200).json({
                ResponseStatus: 0,
                message: "Blog create successfully"
            });
        });
};


exports.deleteBlog = function (req, res) {
    blog
        .findByIdAndRemove(req.params.id)
        .then(results => {
            res.status(201).json({
                ResponseStatus: 0,
                message: "delete blog successfully"
            });
        })
        .catch(err => {
            res.status(504).json({
                message: "Not Found"
            });
        });
};

exports.getBlogById = function (req, res) {
    blog
        .find({ userId: req.user.id })
        .then(results => {
            res.status(201).json({
                ResponseStatus: 0,
                blog: results,
                message: "get blog successfully"
            });
        })
        .catch(err => {
            res.status(504).json({
                message: "Not Found"
            });
        });
};
