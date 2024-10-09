const Order = require("../models/orderModel");
const io = require("../server").io;  // To access Socket.io instance

// Place a new order
exports.placeOrder = async (req, res) => {
    const { restaurantId, items, total, deliveryAddress } = req.body;
    const customerId = req.user._id;
    
    try {
        const order = await Order.create({
            customer: customerId,
            restaurant: restaurantId,
            items,
            total,
            deliveryAddress,
        });

        // Notify restaurant (assuming restaurant joins their own room using their restaurantId)
        io.to(restaurantId).emit("newOrder", { order });

        return res.status(201).json(order);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Update order status (for restaurant use)
exports.updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
        const order = await Order.findById(orderId);

        if (order) {
            order.status = status;
            await order.save();

            // Notify customer (assuming customer joins a room with their orderId)
            io.to(order._id.toString()).emit("orderStatus", {
                orderId: order._id,
                status: order.status,
            });

            return res.json(order);
        } else {
            return res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
