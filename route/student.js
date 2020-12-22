const router = require("express").Router();
const authToken = require("../middleware/auth");
const Stucontrol = require("../controllers/student");

router.get("/getdata", authToken,Stucontrol.student_data);

router.post("/add",authToken, Stucontrol.student_adddata);

router.get("/singal/:Id",authToken, Stucontrol.student_singaldata);

router.delete("/remove/:id", authToken,Stucontrol.student_Deletedata);

router.put("/update/:id",authToken, Stucontrol.student_Updatedata);

module.exports = router;
