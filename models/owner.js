<<<<<<< HEAD
const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  ownerName: String,
  emailid:String,
  messName: {type:String,unique:true},
  phoneNumber: {type:String,unique:true},
  address: String,
  password: String,
  confirmPassword: String,
});

module.exports = mongoose.model("Owner", ownerSchema);
=======
const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  ownerName: String,
  emailid:String,
  messName: {type:String,unique:true},
  phoneNumber: {type:String,unique:true},
  address: String,
  password: String,
  confirmPassword: String,
});

module.exports = mongoose.model("Owner", ownerSchema);
>>>>>>> 9708d123679f0c82dced4f2988bb03cd650a6021
