const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  ownerName: String,
  email: String,
  messName: { type: String, unique: true },
  phoneNumber: { type: String, unique: true },
  address: String,
  password: String,
  confirmPassword: String,
});

module.exports = mongoose.model("Owner", ownerSchema);
