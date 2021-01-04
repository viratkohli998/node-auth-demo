const mongoose = require("mongoose");

const ContactUs_schema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  message: {
    type: String,
  },
});
module.exports = mongoose.model("contactUs", ContactUs_schema);
