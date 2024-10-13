const mongoose = require("mongoose");

//MongoDb connection string
const DB_URI = "mongodb://localhost:27017/messConnect";

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connection successful");
  } catch (error) {
    console.error("MongoDB connection error : ", error);
    process.exit(1);
  }
};
module.exports=connectDB;