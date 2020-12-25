const contactUs = require("../models/contactUs");
const validationContactUs = require("../validation/contactUs");

exports.createContactUs = function (req, res) {
  const { errors, isValid } = validationContactUs(req.body);
  if (!isValid) {
    return res.status(201).json(errors);
  }
  contactUs
    .create(req.body)
    .catch((err) => {
      return res.status(200).json({
        message: "Please enter valid data",
      });
    })
    .then((results) => {
      return res.status(200).json({
        ResponseStatus: 0,
        message: "contact submitted successfully",
      });
    });
};
