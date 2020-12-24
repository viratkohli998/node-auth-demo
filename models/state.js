const mongoose = require("mongoose");

const State_schema = new mongoose.Schema({
  Id: {
    type: String
  },
  State: {
    type: String
  },
  CountryId:{
    type:String
  }
});
module.exports = mongoose.model("state", State_schema);