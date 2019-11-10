var mongoose = require("mongoose");


var ReviewModel = new mongoose.model("reviews", {
  _id: mongoose.Schema.Types.ObjectId,
  content: String,
  rate: { type: Number, max: 5, min: 1 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "products" }
});


module.exports = ReviewModel