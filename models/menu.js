// models/menu.js
const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner",
        required: true
    },
    mealType: {
        type: String,
        required: true
    },
    days: {
        monday: {
            item: String,
            price: Number
        },
        tuesday: {
            item: String,
            price: Number
        },
        wednesday:{
            item:String,
            price:Number
        },
        thursday:{
            item:String,
            price:Number
        },
        friday:{
            item:String,
            price:Number
        },
        saturday:{
            item:String,
            price:Number
        },
        sunday:{
            item:String,
            price:Number
        }
    }
});

module.exports = mongoose.model("Menu", menuSchema);
