const loginform = require("../models/loginform");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validationsignin = require("../validation/loginform");
const validationlogin = require("../validation/login");

exports.logingetdata = (req, res) => {
  loginform.find({}, function (err, data) {
    res.json(data);
  });
};

exports.signin = function (req, res) {
  const { errors, isValid } = validationsignin(req.body);
  if (!isValid) {
    return res.status(201).json(errors);
  }
  loginform
    .find({ email: req.body.email })
    .exec()
    .then(results => {
      if (results.length >= 1) {
        return res.status(200).json({
          message: "Email is exists"
        });
      } else {
        bcrypt.hash(
          req.body.password && req.body.confimPassword,
          10,
          (err, hash) => {
            if (err) {
              return res.status(200).json({
                message: "Not found"
              });
            } else {
              console.log(req.body);
              var data = new loginform({
                Name: req.body.Name,
                PhoneNo: req.body.PhoneNo,
                Pincode: req.body.Pincode,
                email: req.body.email,
                password: hash,
                confimPassword: hash
              });
              console.log("data", data);
              loginform
                .create(data)
                .catch(err => {
                  return res.status(200).json({
                    message: "You not Enter valid data"
                  });
                })
                .then(results => {
                  return res.status(200).json({
                    ResponseStatus: 0,
                    message: "Registstion sucessfull"
                  });
                });
            }
          }
        );
      }
    });
};

exports.login = (req, res, next) => {
  const { errors, isValid } = validationlogin(req.body);
  if (!isValid) {
    return res.status(404).json(errors);
  }
  loginform
    .find({ email: req.body.email })
    .exec()
    .then(results => {
      if (results.length < 1) {
        res.status(200).json({
          message: "Mail not Found , User doesnot exist"
        });
      }
      bcrypt.compare(req.body.password, results[0].password, (err, result) => {
        if (err) {
          return res.status(200).json({
            message: "Not found"
          });
        }
        if (result) {
          const token = jwt.sign(
            { id: results.id, email: results.email },
            process.env.test ? process.env.test : 'SECRET_KEY',
            {
              expiresIn: 120000
            }
          );

          return res.status(200).json({
            ResponseStatus: 0,
            message: "Sucefull",
            token: token
          });
        }
        res.status(200).json({
          message: "Not Found"
        });
      });
    })
    .catch(err => {
      res.status(200).json({
        message: "Not found"
      });
    });
};

exports.deletelogin = function (req, res) {
  loginform
    .findByIdAndRemove(req.params.id)
    .then(results => {
      res.status(201).json({
        message: "Sucessfully Delete record"
      });
    })
    .catch(err => {
      res.status(504).json({
        message: "Not Found"
      });
    });
};
