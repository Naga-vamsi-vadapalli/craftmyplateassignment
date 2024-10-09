const Restaurant = require('../models/restaurantModel');

// Create a new restaurant
exports.createRestaurant = async (req, res) => {
    const { name, location } = req.body;
    try {
        const restaurant = new Restaurant({ name, location });
        await restaurant.save();
        return res.status(201).json(restaurant);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Update restaurant details
exports.updateRestaurant = async (req, res) => {
    const { restaurantId } = req.params;
    try {
        const restaurant = await Restaurant.findById(restaurantId);
        if (restaurant) {
            restaurant.name = req.body.name || restaurant.name;
            restaurant.location = req.body.location || restaurant.location;
            await restaurant.save();
            return res.json(restaurant);
        } else {
            return res.status(404).json({ message: "Restaurant not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Add a menu item to a restaurant
exports.addMenuItem = async (req, res) => {
    const { restaurantId } = req.params;
    const { name, description, price, availability } = req.body;
    try {
        const restaurant = await Restaurant.findById(restaurantId);
        if (restaurant) {
            restaurant.menu.push({ name, description, price, availability });
            await restaurant.save();
            return res.status(201).json(restaurant);
        } else {
            return res.status(404).json({ message: "Restaurant not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get restaurants
exports.getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        return res.json(restaurants);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
