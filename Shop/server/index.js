import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import connection from './DB.js';
import ProductRoute from './routes/ProductRoute.js';
import UserRoute from './routes/UserRoute.js';
import OrderRoute from './routes/OrderRoute.js';


const app = express();
app.use(cors());
app.use(express.json());
dotenv.config()
connection()
app.use("/uploads", express.static("uploads"));

app.use("/product",ProductRoute)
app.use("/user",UserRoute)
app.use("/order",OrderRoute)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});