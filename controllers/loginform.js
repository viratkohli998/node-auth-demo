const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginForm = require("../models/loginform");
const country = require("../models/country");
const state = require("../models/state");
const validationSignIn = require("../validation/loginform");
const validationLogin = require("../validation/login");


exports.loginData = (req, res) => {
  loginForm.find({}, function (err, data) {
    res.json(data);
  });
};

exports.signIn = function (req, res) {
  const { errors, isValid } = validationSignIn(req.body);
  if (!isValid) {
    return res.status(201).json(errors);
  }
  loginForm
    .find({ email: req.body.email })
    .exec()
    .then(results => {
      if (results.length >= 1) {
        return res.status(200).json({
          message: "Email is exists!"
        });
      } else {
        bcrypt.hash(
          req.body.password,
          10,
          (err, hash) => {
            if (err) {
              return res.status(200).json({
                message: "Not found"
              });
            } else {
              var data = new loginForm({
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
                skill: req.body.skill
              });
              loginForm
                .create(data)
                .catch(err => {
                  return res.status(200).json({
                    message: "Please enter valid data"
                  });
                })
                .then(results => {
                  return res.status(200).json({
                    ResponseStatus: 0,
                    message: "Registration successfully"
                  });
                });
            }
          }
        );
      }
    });
};

exports.login = (req, res, next) => {
  const { errors, isValid } = validationLogin(req.body);
  if (!isValid) {
    return res.status(404).json(errors);
  }
  loginForm
    .find({ email: req.body.email })
    .exec()
    .then(results => {
      if (results.length < 1) {
        res.status(200).json({
          message: "User doesn't exist"
        });
      }
      bcrypt.compare(req.body.password, results[0].password, (err, result) => {
        if (err) {
          return res.status(200).json({
            message: "User not found"
          });
        }
        if (result) {
          const jwtToken = jwt.sign({
            data: {
              id: results[0].id,
              name: results[0].name,
              email: results[0].email
            }
          }, '123123', { expiresIn: 86400 });
          return res.status(200).json({
            ResponseStatus: 0,
            message: "login successfully",
            token: jwtToken
          });
        }
        res.status(200).json({
          message: "password is incorrect"
        });
      });
    })
    .catch(err => {
      res.status(200).json({
        message: "Not found"
      });
    });
};

exports.deleteUser = function (req, res) {
  loginForm
    .findByIdAndRemove(req.params.id)
    .then(results => {
      res.status(201).json({
        message: "Successfully delete record"
      });
    })
    .catch(err => {
      res.status(504).json({
        message: "Not Found"
      });
    });
};


exports.getAllCountry = function (req, res) {
  country
    .find()
    .then(results => {
      res.status(201).json({
        message: "get all country successfully",
        countryList: results
      });
    })
    .catch(err => {
      res.status(504).json({
        message: "country not found"
      });
    });
};

exports.getStateById = function (req, res) {
  state
    .find({ "CountryId": req.params.id })
    .then(results => {
      res.status(201).json({
        message: "get all state successfully",
        stateList: results
      });
    })
    .catch(err => {
      res.status(504).json({
        message: "state not found"
      });
    });
};
