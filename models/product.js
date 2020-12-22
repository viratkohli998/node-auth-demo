const mongoose = require("mongoose");
const product_schema = new mongoose.Schema({
  Name: String,
	image1:String,
	added_date:{
		type: Date,
		default: Date.now
	}
});
module.exports = mongoose.model("product", product_schema);
