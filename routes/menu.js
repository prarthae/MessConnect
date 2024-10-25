const express = require("express");
const router = express.Router();
const Menu = require("../models/menu"); // Import the Menu model
const { checkOwnerAuth } = require("../middleware/auth");
// // Middleware to check if the owner is logged in
// const checkOwnerAuth = (req, res, next) => {
//   if (req.session && req.session.ownerId) {
//     next();
//   } else {
//     res.redirect("/login");
//   }
// };
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

// routes/menu.js
router.get("/menu/:mealType", async (req, res) => {
  const { mealType } = req.params;
  const selectedDate = req.query.selectedDate;

  if (!selectedDate) {
    return res.status(400).send("Please provide a valid date.");
  }

  try {
    // Fetch menu items based on the meal type
    const menus = await Menu.find({ mealType }).populate("ownerId");
    if (!menus || menus.length === 0) {
      return res.render("menu_display", { menuItems: [], mealType });
    }

    // Get the day of the week from the selected date
    const dayOfWeek = new Date(selectedDate)
      .toLocaleString("en-US", { weekday: "long" })
      .toLowerCase();

    // Extract menu items for the specific day
    const menuItems = menus
      .map((menu) => {
        return {
          item: menu.days[dayOfWeek][0].item,
          price: menu.days[dayOfWeek][0].price,
          mess: menu.ownerId.messName,
        };
      })
      .flat();
    //  const messName
    console.log({ menuItems, mealType }, "l");

    // Pass the menu items and mealType to the view
    res.render("menu_display", { menuItems, mealType });
  } catch (err) {
    res.status(500).send("Error fetching menu.");
  }
});

module.exports = router;
