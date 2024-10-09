const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const orderRoutes = require("./routes/orderRoutes");
const http = require("http");
const socketIo = require("socket.io");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/orders", orderRoutes);

const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: "*", 
    },
});

io.on("connection", (socket) => {
    console.log("New client connected: ", socket.id);

    socket.on("joinRoom", (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
    });

    socket.on("orderUpdate", (orderData) => {
        io.to(orderData.orderId).emit("orderStatus", orderData);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
