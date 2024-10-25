const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
// Connect to MongoDB
const connectDB = require("./config/dbconnection");
connectDB();

const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();

// Middleware
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie:{secure:false}
  })
);



// Routes
const indexRouter = require("./routes/index");
const ownerRouter = require("./routes/owner");
const menuRoutes = require("./routes/menu");

app.use("/", menuRoutes);
app.use("/", indexRouter);
app.use("/", ownerRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
