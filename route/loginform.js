const router = require("express").Router();
const loginController = require("../controllers/loginform");
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

router.get("/login-record", loginController.loginData);

router.get("/getUserById", isTokenIsValid, loginController.getUserById);

router.post("/signIn", loginController.signIn);

router.post("/login", loginController.login);

router.delete("/removeUser/:id", loginController.deleteUser);

router.get("/getAllCountry", loginController.getAllCountry);

router.get("/getStateById/:id", loginController.getStateById);

router.put("/updateProfile", isTokenIsValid, loginController.updateProfile);

router.put("/changePassword", isTokenIsValid, loginController.changePassword);

router.post("/forgetPassword", loginController.forgetPassword);

router.post("/resetPassword", loginController.resetPassword);

router.post(
  "/updateProfilePic",
  isTokenIsValid,
  upload.any(),
  loginController.updateProfilePic
);

module.exports = router;
