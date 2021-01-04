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

module.exports = router;
