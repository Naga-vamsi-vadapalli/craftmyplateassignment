const express = require('express');
const { registerUser, loginUser, getProfile, updateProfile } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.route('/profile').get(protect, getProfile).put(protect, updateProfile);

module.exports = router;
