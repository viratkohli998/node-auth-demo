const mongoose = require("mongoose");

const loginForm_schema = new mongoose.Schema({
  name: {
    type: String
  },
  phoneNo: {
    type: String
  },
  pinCode: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  course: {
    type: String
  },
  city: {
    type: String
  },
  country: {
    type: String
  },
  state: {
    type: String
  },
  address: {
    type: String
  },
  skill: [String],
  forgetPasswordToken: String,
  profilePic : String
});
module.exports = mongoose.model("User", loginForm_schema);
