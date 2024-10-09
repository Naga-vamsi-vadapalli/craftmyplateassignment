const express = require("express");
const { placeOrder, updateOrderStatus } = require("../controllers/orderController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, placeOrder);
router.put("/:orderId", protect, updateOrderStatus);

module.exports = router;
