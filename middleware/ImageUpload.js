const multer = require("multer"), path = require("path");


const upload = multer({
  storage: multer.diskStorage({
      destination: function (req, file, callback) {
          callback(null, "./upload");
      },
      filename: function (req, file, callback) {
          callback(
              null,
              file.fieldname + "-" + Date.now() + path.extname(file.originalname)
          );
      }
  }),
  fileFilter: function (req, file, callback) {
      callback(null, true);
  }
});