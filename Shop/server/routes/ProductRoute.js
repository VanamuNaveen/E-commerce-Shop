import express from "express";
import Product from "../models/ProductModel.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const ProductRoute = express.Router();

const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

ProductRoute.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

ProductRoute.post("/create", upload.array("images"), async (req, res) => {
    try {
        const { productName, productDescription, basePrice, discount, discountDuration, categories } = req.body;
        const imagePaths = req.files.map(file => `/uploads/${file.filename}`);
        const categoryArray = JSON.parse(categories || "[]");
        const newProduct = new Product({
            productName,
            productDescription,
            basePrice,
            discount,
            discountDuration: new Date(discountDuration),
            images: imagePaths,
            categories: categoryArray,
        });
        const savedProduct = await newProduct.save();
        res.status(201).json({ message: "Product created successfully", product: savedProduct });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Failed to create product", error: error.message });
    }
});


ProductRoute.get("/all", async (req, res) => {
  try {
      const products = await Product.find();
      
      // Convert stored image paths to complete URLs
      const updatedProducts = products.map(product => ({
          ...product._doc, // Get product fields
          images: product.images.map(img => `http://localhost:8080${img}`) // Append base URL
      }));

      res.status(200).json(updatedProducts);
  } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
});

ProductRoute.get("/single/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        product.images = product.images.map(img => `http://localhost:8080${img}`); // Append base URL
        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Failed to fetch product", error: error.message });
    }
}
);


export default ProductRoute;
