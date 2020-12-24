const router = require("express").Router();
const loginController = require("../controllers/loginform");

router.get("/login-record", loginController.loginData);

router.post("/signIn", loginController.signIn);

router.post("/login", loginController.login);

router.delete("/removeUser/:id", loginController.deleteUser);

router.get("/getAllCountry", loginController.getAllCountry);

router.get("/getStateById/:id", loginController.getStateById);


module.exports = router;
