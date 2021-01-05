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
    default: Date.now,
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
  blogLike: [String],
  blogDislike: [String],
  blogComment: [String],
});
module.exports = mongoose.model("blog", Blog_schema);
