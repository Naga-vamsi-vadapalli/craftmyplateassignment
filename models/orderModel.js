const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    items: [{ name: String, quantity: Number, price: Number }],
    total: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "In Progress", "Completed", "Delivered"], default: "Pending" },
    deliveryAddress: { type: String, required: true },
}, {
    timestamps: true,
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
