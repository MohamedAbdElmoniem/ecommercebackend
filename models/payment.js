var mongoose = require("mongoose");

var PaymentModel = new mongoose.model("payments", {
  _id: mongoose.Schema.Types.ObjectId,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
  date: { type: mongoose.Schema.Types.Date, default: Date.now() },
  payment_method: String,
  paid: Number,
  change: Number
});

module.exports = PaymentModel
