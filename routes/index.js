const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Student = require("../models/student");
const Owner = require("../models/owner");
const Menu = require("../models/menu")

// Regular expressions for email and phone validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{10}$/;




// Home Page
router.get("/", (req, res) => {
  res.render("home");
});

// About Us
router.get("/about", (req, res) => {
  res.render("about");
});

// Contact Us
router.get("/contact", (req, res) => {
  res.render("contact");
});

// Login
router.get("/login", (req, res) => {
  res.render("login");
});

// Student Registration
router.get("/student_registration", (req, res) => {
  res.render("student_registration");
});

// Owner Registration
router.get("/owner_registration", (req, res) => {
  res.render("owner_registration");
});

// Handle Student Registration
router.post("/register_student", async (req, res) => {
  const {
    name,
    email,
    address,
    phoneNumber,
    gender,
    password,
    confirmPassword,
  } = req.body;

  // Validate email and phone number format
  if (!emailRegex.test(email)) {
    return res.send("Invalid email format.");
  }

  console.log(phoneNumber, phoneRegex.test(phoneNumber));
  if (!phoneRegex.test(phoneNumber)) {

    return res.send("Phone number must be 10 digits.");
  }

  //Check if email or phone number already exist in the student collection
  const existingStudent = await Student.findOne({
    $or: [{ email }, { phoneNumber }],
  });
  if (existingStudent) {
    return res.send("Email or phone number is already registered.");
  }

  if (password === confirmPassword) {
    const newStudent = new Student({
      name,
      email,
      address,
      phoneNumber,
      gender,
      password,
      confirmPassword,
    });
    await newStudent.save();
    res.redirect("/");
  } else {
    res.send("Passwords do not match!");
  }
});

// Handle Owner Registration
router.post("/register_owner", async (req, res) => {
  const {
    ownerName,
    email,
    messName,
    phoneNumber,
    address,
    password,
    confirmPassword,
  } = req.body;

  // Validate email and phone number format
  if (!emailRegex.test(email)) {
    return res.send("Invalid email format.");
  }
  console.log(phoneNumber, phoneRegex.test(phoneNumber));

  if (!phoneRegex.test(phoneNumber)) {
    return res.send("Phone number must be 10 digits.");
  }

  // Check if email or phone number already exists in the Owner collection
  const existingOwner = await Owner.findOne({
    $or: [{ email }, { phoneNumber }],
  });
  if (existingOwner) {
    return res.send("Email or phone number is already registered.");
  }

  if (password === confirmPassword) {
    const newOwner = new Owner({
      ownerName,
      email,
      messName,
      phoneNumber,
      address,
      password,
      confirmPassword,
    });
    await newOwner.save();
    res.redirect("/");
  } else {
    res.send("Passwords do not match!");
  }
});

// Handle Login
router.post("/login", async (req, res) => {
  const { username, password, role } = req.body;

  const email = username;

  if (role === "student") {
    const student = await Student.findOne({ email, password });
    if (student) {
      res.redirect("/select_your_mess");
    } else {
      res.send("Invalid username or password");
    }
  } else if (role === "owner") {
    const owner = await Owner.findOne({ email, password });
    if (owner) {
      req.session.ownerId = owner._id;
      res.redirect("/owner_dashboard"); // Create this route as needed
    } else {
      res.send("Invalid username or password");
    }
  }
});

// Select Your Mess Page
router.get("/select_your_mess", (req, res) => {
  res.render("select_your_mess");
});


module.exports = router;