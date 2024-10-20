const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email:{ type: String,unique:true},
  address: String,
  phoneNumber: {type:String,unique:true},
  gender: String,
  password: String,
  confirmPassword: String,
});

module.exports = mongoose.model("Student", studentSchema);