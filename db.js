import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

await mongoose.connect(process.env.MONGODB_CONNECTION_STR);

console.log("Connection established with MongoDB");

