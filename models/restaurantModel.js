const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    availability: { type: Boolean, default: true },
});

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    menu: [menuItemSchema],
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;
