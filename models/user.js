var mongoose = require("mongoose");

var UserModel = new mongoose.model("users", {
  _id: mongoose.Schema.Types.ObjectId,
  username: { type: String, required: true, unique: true },
  password: String,
  phone: Number,
  address: String,
  age: { type: Number, max: 100, min: 10 },
  role: String
});

module.exports = UserModel;
