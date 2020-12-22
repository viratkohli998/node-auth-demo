const mongoose = require("mongoose");

const loginform_schema = new mongoose.Schema({
  Name: {
    type: String
  },
  PhoneNo: {
    type: String
  },
  Pincode: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  confimPassword: {
    type: String
  }
});
module.exports = mongoose.model("test", loginform_schema);
