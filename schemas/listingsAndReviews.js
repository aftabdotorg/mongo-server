import mongoose from "mongoose";

const listingsAndReviewsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { collection: "listingsAndReviews" }
);

export default listingsAndReviewsSchema;
