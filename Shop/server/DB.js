import mongoose from "mongoose";

const connection = async () => {
    try {
        const conn = await mongoose.connect(process.env.DBURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed", error);
    }
};
export default connection
