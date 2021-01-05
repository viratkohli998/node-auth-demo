const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
var handlebars = require("handlebars");
var fs = require("fs");

const user = require("../models/loginform");
const country = require("../models/country");
const state = require("../models/state");
const validationSignIn = require("../validation/loginform");
const validationUpdateProfile = require("../validation/updateProfile");
const validationLogin = require("../validation/login");
const validationChangePassword = require("../validation/changePassword");
const isEmpty = require("../validation/is-empty");

exports.loginData = (req, res) => {
  user.find({}, function (err, data) {
    res.json(data);
  });
};

exports.getUserById = (req, res) => {
  user.find({ _id: req.user.id }, function (err, data) {
    return res.json({
      ReturnCode: 1,
      data,
      message: "get user successfully",
    });
  });
};

exports.signIn = function (req, res) {
  const { errors, isValid } = validationSignIn(req.body);
  if (!isValid) {
    return res.status(201).json(errors);
  }
  user
    .find({ email: req.body.email })
    .exec()
    .then((results) => {
      if (results.length >= 1) {
        return res.status(200).json({
          message: "Email is exists!",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(200).json({
              message: "Not found",
            });
          } else {
            var data = new user({
              name: req.body.name,
              phoneNo: req.body.phoneNo,
              pinCode: req.body.pinCode,
              email: req.body.email,
              password: hash,
              course: req.body.course,
              city: req.body.city,
              country: req.body.country,
              state: req.body.state,
              address: req.body.address,
              skill: req.body.skill,
            });
            user
              .create(data)
              .catch((err) => {
                return res.status(200).json({
                  message: "Please enter valid data",
                });
              })
              .then((results) => {
                return res.status(200).json({
                  ResponseStatus: 0,
                  message: "Registration successfully",
                });
              });
          }
        });
      }
    });
};

exports.login = (req, res, next) => {
  const { errors, isValid } = validationLogin(req.body);
  if (!isValid) {
    return res.status(404).json(errors);
  }
  user
    .find({ email: req.body.email })
    .exec()
    .then((results) => {
      if (results.length < 1) {
        res.status(200).json({
          message: "User doesn't exist",
        });
      }
      bcrypt.compare(req.body.password, results[0].password, (err, result) => {
        if (err) {
          return res.status(200).json({
            message: "User not found",
          });
        }
        if (result) {
          const jwtToken = jwt.sign(
            {
              data: {
                id: results[0].id,
                name: results[0].name,
                email: results[0].email,
              },
            },
            "123123",
            { expiresIn: 86400 }
          );
          return res.status(200).json({
            ResponseStatus: 0,
            message: "login successfully",
            token: jwtToken,
            data: results,
          });
        }
        res.status(200).json({
          message: "password is incorrect",
        });
      });
    })
    .catch((err) => {
      res.status(200).json({
        message: "Not found",
      });
    });
};

exports.deleteUser = function (req, res) {
  user
    .findByIdAndRemove(req.params.id)
    .then((results) => {
      res.status(201).json({
        message: "Successfully delete record",
      });
    })
    .catch((err) => {
      res.status(504).json({
        message: "Not Found",
      });
    });
};

exports.getAllCountry = function (req, res) {
  country
    .find()
    .then((results) => {
      res.status(201).json({
        message: "get all country successfully",
        countryList: results,
      });
    })
    .catch((err) => {
      res.status(504).json({
        message: "country not found",
      });
    });
};

exports.getStateById = function (req, res) {
  state
    .find({ CountryId: req.params.id })
    .then((results) => {
      res.status(201).json({
        message: "get all state successfully",
        stateList: results,
      });
    })
    .catch((err) => {
      res.status(504).json({
        message: "state not found",
      });
    });
};

exports.updateProfile = function (req, res) {
  const { errors, isValid } = validationUpdateProfile(req.body);
  if (!isValid) {
    return res.status(201).json(errors);
  }
  var data = {
    name: req.body.name,
    phoneNo: req.body.phoneNo,
    pinCode: req.body.pinCode,
    course: req.body.course,
    city: req.body.city,
    country: req.body.country,
    state: req.body.state,
    address: req.body.address,
    skill: req.body.skill,
  };

  user
    .findOneAndUpdate({ _id: req.user.id }, data)
    .catch((err) => {
      return res.status(200).json({
        message: "Please enter valid data",
      });
    })
    .then((results) => {
      return res.status(200).json({
        ResponseStatus: 0,
        message: "update successfully",
      });
    });
};

exports.changePassword = async function (req, res) {
  const { errors, isValid } = validationChangePassword(req.body);
  if (!isValid) {
    return res.status(201).json(errors);
  }
  const getUser = await user.findOne({ _id: req.user.id });
  if (!getUser)
    return res.status(200).json({
      ResponseStatus: 0,
      message: "user not found",
    });

  await bcrypt.compare(
    req.body.oldPassword,
    getUser.password,
    (err, result) => {
      if (result) {
        bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
          if (err) {
            return res.status(200).json({
              message: "old password is not match!",
            });
          } else {
            var data = {
              password: hash,
            };
            user.update({ _id: req.user.id }, data).exec((err, result) => {
              if (err) {
                return res.send(500, { err: err });
              } else {
                return res.json({
                  ReturnCode: 0,
                  message: "password update successfully",
                });
              }
            });
          }
        });
      } else {
        return res.status(200).json({ message: "old password is not match!" });
      }
    }
  );
};

exports.forgetPassword = async (req, res) => {
  const users = await user.findOne({ email: req.body.email });
  if (!users) return res.status(200).send({ message: "email not found" });

  var readHTMLFile = function (path, callback) {
    fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
      if (err) {
        throw err;
        callback(err);
      } else {
        callback(null, html);
      }
    });
  };

  const data = {
    forgetPasswordToken: Math.random().toString(36).replace("0.", ""),
  };

  await user.updateOne({ Email: req.body.email }, data);

  const url = `${req.get("origin")}/forget-password/link/${
    data.forgetPasswordToken
  }`;

  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "moonnode35@gmail.com",
      pass: "qwe123!@#QWE",
    },
  });

  readHTMLFile(
    __dirname + "/email/verify/forgetPassword.html",
    function (err, html) {
      var template = handlebars.compile(html);
      var replacements = {
        url: url,
      };
      var htmlToSend = template(replacements);
      let info = transporter.sendMail({
        to: req.body.email,
        subject: "Forget_Password",
        html: htmlToSend,
      });
    }
  );

  transporter.verify(function (error, success) {
    if (error) {
      return res
        .status(200)
        .send({ ReturnCode: 0, message: "Email not found" });
    } else {
      return res.status(200).send({
        ReturnCode: 1,
        message: "Forget password link send in your Email",
      });
    }
  });
};

exports.resetPassword = async (req, res) => {
  const getToken = await user.findOne({
    forgetPasswordToken: req.body.Token,
  });
  if (!getToken)
    return res.status(200).send({
      message: "Your Email is Expired go to Forget PassWord link",
    });

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(200).json({
        message: "Not found",
        ReturnCode: 0,
      });
    } else {
      var data = {
        pass: hash,
        forgetPasswordToken: Math.random().toString(36).replace("0.", ""),
      };
      user
        .update({ forgetPasswordToken: req.body.Token }, data)
        .exec((err, result) => {
          if (err) {
            res.send(500, { err: err });
          } else {
          }
          return res.json({
            ReturnCode: 1,
            message: "Password update successfully",
          });
        });
    }
  });
};

exports.updateProfilePic = async (req, res) => {
  if (req.files[0].filename) {
    const data = {
      profilePic: req.files[0].filename,
    };
    console.log(data);
    user
      .findOneAndUpdate({ _id: req.user.id }, data)
      .catch((err) => {
        return res.status(202).json({
          message: "file not exist",
        });
      })
      .then((results) => {
        return res.status(200).json({
          ResponseStatus: 0,
          message: "profile picture updated",
        });
      });
  }
};
