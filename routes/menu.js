const express = require("express");
const router = express.Router();
const Menu = require("../models/menu"); // Import the Menu model

// Middleware to check if the owner is logged in
const checkOwnerAuth = (req, res, next) => {
    if (req.session && req.session.ownerId) {
      next();
    } else {
      res.redirect("/login");
    }
  };
  
// Update Menu Route
router.post("/update_menu", checkOwnerAuth, async (req, res) => {
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
  
  const ownerId = req.session.ownerId;

  try {
    // Update the existing menu
    await Menu.findOneAndUpdate(
      { ownerId, mealType },
      {
        days: {
          monday: [{ item: mondayItem, price: mondayPrice }],
          tuesday: [{ item: tuesdayItem, price: tuesdayPrice }],
          wednesday: [{ item: wednesdayItem, price: wednesdayPrice }],
          thursday: [{ item: thursdayItem, price: thursdayPrice }],
          friday: [{ item: fridayItem, price: fridayPrice }],
          saturday: [{ item: saturdayItem, price: saturdayPrice }],
          sunday: [{ item: sundayItem, price: sundayPrice }],
        },
      }
    );

    res.redirect("/owner_dashboard");
  } catch (error) {
    res.status(500).send("Error updating menu: " + error.message);
  }
});

module.exports = router;
