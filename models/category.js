var mongoose = require("mongoose");

var CategoryModel = new mongoose.model("categories", {
  _id: mongoose.Schema.Types.ObjectId,
  category_name: String
});

module.exports = CategoryModel;
