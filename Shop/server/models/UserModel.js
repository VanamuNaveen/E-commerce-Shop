import mongoose from "mongoose";

const userSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    phoneNumber:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    wishlist: {
        type: [String], // Array of product IDs or names
        default: [],
    },
    cart: {
        type: [String], // Array of product IDs or names
        default: [],
    },
    orders: {
        type: [String], // Array of order IDs or names
        default: [],
    }
}, {
  timestamps: true, 
});


const User = mongoose.model("User", userSchema);

export default User