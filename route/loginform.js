const router = require("express").Router();
const loginController = require("../controllers/loginform");
const isTokenIsValid = require("../middleware/auth");

router.get("/login-record", loginController.loginData);

router.post("/signIn", loginController.signIn);

router.post("/login", loginController.login);

router.delete("/removeUser/:id", loginController.deleteUser);

router.get("/getAllCountry", loginController.getAllCountry);

router.get("/getStateById/:id", loginController.getStateById);

router.put("/updateProfile", isTokenIsValid, loginController.updateProfile);

router.put("/changePassword", isTokenIsValid, loginController.changePassword);

router.post("/forgetPassword", loginController.forgetPassword);

router.post("/resetPassword", loginController.resetPassword);

module.exports = router;
