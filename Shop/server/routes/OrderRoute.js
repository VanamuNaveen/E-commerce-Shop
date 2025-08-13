import express from 'express';
import Order from '../models/OrderModel.js';
import User from '../models/UserModel.js';

const OrderRoute = express.Router();

OrderRoute.post("/create", async (req, res) => {
    try {
        const { products, orderedByUserId,address } = req.body;
        const newOrder = new Order({
            products,
            orderedByUserId,
            address
        });
        const savedOrder = await newOrder.save();
        const user = await User.findById(orderedByUserId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.orders.push(savedOrder._id);
        await user.save();
        res.status(201).json({ message: "Order created successfully", order: savedOrder });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Failed to create order", error: error.message });
    }
}
);

OrderRoute.post("/updatestatus", async (req, res) => {
    try {
        const { orderId, status } = req.body;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        order.status = status;
        await order.save();
        res.status(200).json({ message: "Order status updated successfully", order });
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ message: "Failed to update order status", error: error.message });
        
    }
});


OrderRoute.get("/all",async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Failed to fetch orders", error: error.message });
        
    }
});

OrderRoute.get("/single/:orderid", async (req, res) => {
    try {
        const orderId = req.params.orderid;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error("Error fetching order:", error);
        res.status(500).json({ message: "Failed to fetch order", error: error.message });  
        
    }
});

OrderRoute.post("/assigndelivery", async (req, res) => {
    try {
        const { orderId, deliveryPersonName, deliveryPersonPhone } = req.body;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        order.deliveryAssignedTo = `${deliveryPersonName} (${deliveryPersonPhone})`;
        await order.save();
        res.status(200).json({ message: "Delivery person assigned successfully", order });
    } catch (error) {
        console.error("Error assigning delivery person:", error);
        res.status(500).json({ message: "Failed to assign delivery person", error: error.message });
        
    }
});

export default OrderRoute;