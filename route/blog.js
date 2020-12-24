const router = require("express").Router();
const blogController = require("../controllers/blog");
const isTokenIsValid = require("../middleware/auth");

router.get("/getAllBlog", blogController.getAllBlog);

router.post("/createBlog", isTokenIsValid, blogController.createBlog);

router.delete("/deleteBlog/:id", isTokenIsValid, blogController.deleteBlog);

router.get("/getBlogById", isTokenIsValid, blogController.getBlogById);

module.exports = router;
