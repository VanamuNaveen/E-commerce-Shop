import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    products: [{
        productID: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
        discount: {
            type: String,
            default: 0,
        }
    }],
    status:{
        type: String,
        enum: ["order placed", "order confirmed", "preparing to ship", "shipped", "delivered"],
        default: "order placed",
    },
    orderedByUserId: {
        type: String,
        required: true,
    },
    deliveryAssignedTo: {
        type: String,
        default: "Yet to assign",
    },
    address: {
        type: String,
        required: true,
    }

}, {
  timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
});

const Order = mongoose.model("Order", orderSchema);
export default Order;