const express = require('express');
const { createRestaurant, updateRestaurant, addMenuItem, getRestaurants } = require('../controllers/restaurantController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/')
    .get(getRestaurants)
    .post(protect, createRestaurant);

router.route('/:restaurantId')
    .put(protect, updateRestaurant);

router.route('/:restaurantId/menu')
    .post(protect, addMenuItem);

module.exports = router;
