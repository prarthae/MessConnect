<<<<<<< HEAD
const express = require("express");
const mongoose = require('mongoose');
// Connect to MongoDB
const connectDB=require('./config/dbconnection');
connectDB();

const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();


// Middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

// Routes
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
=======
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/messConnect", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

// Routes
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
>>>>>>> 9708d123679f0c82dced4f2988bb03cd650a6021
