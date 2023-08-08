import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGODB_CONNECTION_STR);
    console.log(`MongoDB connected: ${res.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
