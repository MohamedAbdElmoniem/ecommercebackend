var mongoose = require("mongoose");

var ProductModel = new mongoose.model("products", {
  _id: mongoose.Schema.Types.ObjectId,
  product_name: String,
  brand: String,
  model: String,
  price: Number,
  discount: Number,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "categories" }
});

module.exports = ProductModel;

