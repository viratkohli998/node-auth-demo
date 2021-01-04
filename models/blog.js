const mongoose = require("mongoose");

const Blog_schema = new mongoose.Schema({
    userId: {
        type: String,
    },
    blogTitle: {
        type: String,
    },
    blogDate: {
        type: Date,
        default: Date.now
    },
    blogContent: {
        type: String,
    },
    blogCreatedBy: {
        type: String,
    },
    blogImagePath: {
        type: String,
    },
    // blogLike: {
    //     type: Boolean,
    // },
    // blogDislike: {
    //     type: Boolean,
    // },
    // blogLikeCounter: {
    //     type: Number,
    // },
    // blogDislikeCounter: {
    //     type: Number,
    // },
    // blogComment: {
    //     type: Array,
    //     default: []
    // },
    // blogView: {
    //     type: Number
    // }
});
module.exports = mongoose.model("blog", Blog_schema);