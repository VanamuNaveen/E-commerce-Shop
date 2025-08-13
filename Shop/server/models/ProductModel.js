import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  productDescription: {
    type: String,
    required: true,
    trim: true,
  },
  basePrice: {
    type: Number,
    required: true,
    min: 0,
  },
  discount: {
    type: String,
    default: "0%",// Assuming discount is a percentage
  },
  discountDuration: {
    type: Date, // You can use Date to store the end time of the discount
  },
  images:  {
    type: [String], // Array of category names or IDs
    default: [],
  }, // Array of image file paths or IDs
  categories: {
    type: [String], // Array of category names or IDs
    default: [],
  },
  orderedBy:{
    type: Number,
    default: 0
  }
}, {
  timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
});

const Product = mongoose.model("Product", productSchema);

export default Product;