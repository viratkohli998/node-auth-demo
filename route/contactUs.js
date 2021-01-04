const router = require("express").Router();
const blogController = require("../controllers/contactUs");

router.post("/contactUs", blogController.createContactUs);

module.exports = router;
