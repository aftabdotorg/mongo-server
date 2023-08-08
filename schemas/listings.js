import mongoose from "mongoose";

const listingSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a Name"],
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: [true, "Please provide a Price per night"],
  },
  currency: {
    type: String,
    enum: ["USD", "INR", "EUR"],
    required: true,
  },
});

export default listingSchema;
