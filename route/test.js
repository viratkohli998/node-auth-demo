const express = require("express");
const router = require("express").Router();
const multer = require("multer"),
path = require("path");
const Detail = require("../models/product");
const auth = require("../middleware/auth");

router.get("/", auth,function (req, res){
    res.status(200).json({
        ResponseStatus: 0,
        message: "Done"
      });
});