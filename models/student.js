const mongoose = require("mongoose");

const student_schema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    Address: {
      type: String
    },
    phoneNumber: {
      type: Number
    },
    lastname: {
      type: String
    },
    DateofBirth:{
      type:String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("users", student_schema);
