const express = require("express");
const router = express.Router();
const Menu = require("../models/menu"); // Import the Menu model
const Owner = require("../models/owner"); // Import the Owner model


const {checkOwnerAuth}=require("../middleware/auth");

// Owner Dashboard Route
router.get("/owner_dashboard", checkOwnerAuth, async (req, res) => {
  const ownerId = req.session.ownerId; // Assuming session stores the logged-in owner ID
  if (!ownerId) {
    return res.redirect("/login");
  }

  try {
    // Fetch menus by the logged-in owner
    const menus = await Menu.find({ ownerId });

    // Render the owner dashboard and pass the menus
    res.render("owner_dashboard", { menus: menus || [] });
  } catch (error) {
    res.status(500).send("Error fetching menus: " + error.message);
  }
});

// Add Menu Page Route (GET)
router.get("/add_menu", checkOwnerAuth, (req, res) => {
  // Render the add_menu page where owner can fill out new menu details
  res.render("add_menu");
});

// Add Menu Route
router.post("/add_menu", checkOwnerAuth, async (req, res) => {
  const {
    mealType,
    mondayItem,
    mondayPrice,
    tuesdayItem,
    tuesdayPrice,
    wednesdayItem,
    wednesdayPrice,
    thursdayItem,
    thursdayPrice,
    fridayItem,
    fridayPrice,
    saturdayItem,
    saturdayPrice,
    sundayItem,
    sundayPrice,
  } = req.body;

  // Assuming the logged-in owner's ID is stored in the session
  const ownerId = req.session.ownerId;

  try {
    // Check if the owner has already added a menu for the selected mealType
    const existingMenu = await Menu.findOne({ ownerId, mealType });

    if (existingMenu) {
      // If menu exists, redirect or send a message to prevent duplication
      return res
        .status(400)
        .send(
          "You have already added a menu for this meal type. Please update it instead."
        );
    }

    // Create a new menu for the logged-in owner
    const newMenu = new Menu({
      ownerId,
      mealType,
      days: {
        monday: [{ item: mondayItem, price: mondayPrice }],
        tuesday: [{ item: tuesdayItem, price: tuesdayPrice }],
        wednesday: [{ item: wednesdayItem, price: wednesdayPrice }],
        thursday: [{ item: thursdayItem, price: thursdayPrice }],
        friday: [{ item: fridayItem, price: fridayPrice }],
        saturday: [{ item: saturdayItem, price: saturdayPrice }],
        sunday: [{ item: sundayItem, price: sundayPrice }],
      },
    });

    // Save the new menu to the database
    await newMenu.save();
    res.redirect("/owner_dashboard");
  } catch (error) {
    res.status(500).send("Error saving menu details: " + error.message);
  }
});

// Logout Route for Owner
router.get("/owner_logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error logging out.");
    }
    res.redirect("/login");
  });
});

module.exports = router;
