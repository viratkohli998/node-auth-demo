const router = require("express").Router();
const blogController = require("../controllers/blog");
const isTokenIsValid = require("../middleware/auth");
const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, path.join(__dirname, "/uploads/"));
    },
    filename: function (req, file, callback) {
      callback(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  }),
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(null, false);
    }
    callback(null, true);
  },
});

router.get("/getAllBlog", blogController.getAllBlog);

router.post(
  "/createBlog",
  isTokenIsValid,
  upload.any(),
  blogController.createBlog
);

router.delete("/deleteBlog/:id", isTokenIsValid, blogController.deleteBlog);

router.get("/getBlogById", isTokenIsValid, blogController.getBlogById);

router.post("/blog-commit/:id", isTokenIsValid, blogController.blogCommit);

router.get("/blogLike/:id", isTokenIsValid, blogController.blogLike);

router.get("/blogDisLike/:id", isTokenIsValid, blogController.blogDisLike);

module.exports = router;
