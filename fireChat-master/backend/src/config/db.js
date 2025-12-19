import mongoose from "mongoose";
import ENV from "./env.config.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(ENV.DB_URL);
        console.log("connected to the database");
    } catch (error) {
        console.log(error);
    }
}