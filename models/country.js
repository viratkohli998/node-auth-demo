const mongoose = require("mongoose");

const Country_schema = new mongoose.Schema({
    Id: {
    type: String
  },
  CountryName: {
    type: String
  }
});
module.exports = mongoose.model("country", Country_schema);