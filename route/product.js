const express = require("express");
const router = require("express").Router();
const multer = require("multer"),
  path = require("path");
const Detail = require("../models/product");
const auth = require("../middleware/auth");
const { route } = require("./student");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "./uplods");
    },
    filename: function (req, file, callback) {
      callback(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    }
  }),

  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(/*res.end('Only images are allowed')*/ null, false);
    }
    callback(null, true);
  }
});

router.use(express.static("uplods"));

router.get('/test', (req, res)=>{
  res.send('done')
})



router.get("/datafound",auth,function (req, res) {
  Detail.find({}, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
      // res.render('index',{data:data});
    }
  });
});

router.delete("/removeimage/:id", auth,function (req, res) {
  Detail.findByIdAndRemove(req.params.id)
    .then(results => {
      res.status(200).json({
        ResponseStatus: 0,
        message: "Sucessfully Delete record"
      });
    })
    .catch(err => {
      res.status(200).json({
        message: "Not Found"
      });
    });
});

router.put("/imageupdate/:id", auth,function (req, res) {
  Detail.findOneAndUpdate({ _id: req.params.id }, function (err, data) {
    if (data) {
      const detail = new Detail({
        Name: req.body.Name,
        image1: req.files[0].filename,
      });
      detail.save(req.body, function (err, Person) {
        if (err) res.json({ message: "not found" });
        else res.json({ message: "Image insert sucessfully" });
      });
    } else {
      ``;
      res.json({
        message: "Not Found"
      });
    }
  });
});

router.post("/addimage",auth, upload.any(), function (req, res) {
  // console.log("req.body"); //form fields
  // console.log(req.body);
  // console.log("req.file");
  // console.log(req.files); //form files

  if (!req.body && !req.files) {
    res.json({ success: false });
  } else {
    Detail.findOne({}, function (err, data) {
      // console.log("into detail");
      var c;
      if (data) {
        // console.log("if");
        c = data.unique_id + 1;
      } else {
        c = 1; ``
      }

      const detail = new Detail({
        Name: req.body.Name,
        image1: req.files[0].filename
      });

      detail.save(req.body, function (err, Person) {
        if (err) res.json({ message: "not found" });
        else res.status(200).json({ ResponseStatus: 0, message: "Image insert sucessfully" });
      });
    })
      .sort({ _id: -1 })
      .limit(1);
  }
});

module.exports = router;
