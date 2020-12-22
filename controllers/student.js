const Student = require("../models/student");
const validationregistation = require("../validation/student");

exports.student_data = function (req, res) {
  Student.find({}, function (err, data) {
    res.json(data);
  });
};

exports.student_adddata = (req, res) => {
  const { errors, isValid } = validationregistation(req.body);
  if (!isValid) {
    return res.status(200).json(errors);
  }
  Student.create(req.body)
    .then(results => {
      res.status(201).json({
        ResponseStatus: 0,
        message: "User is createrd"
      });
    })
    .catch(err => {
      res.status(200).json({
        message: "Enter valid Data"
      });
    });
};

exports.student_Deletedata = function (req, res) {
  Student.findByIdAndRemove(req.params.id)
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
};

exports.student_Updatedata = function (req, res) {
  Student.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(book =>
      res.json({
        message: "Sucessfully Update record"
      })
    )
    .catch(err =>
      res.status(200).json({
        message: "Not Found"
      })
    );
};

exports.student_singaldata = (req, res) => {
  Student.findOne({ _id: req.params.Id }, function (err, result) {
    res.json(result);
    console.log(req.params.Id);
  }).catch(err => console.log(message));
};
