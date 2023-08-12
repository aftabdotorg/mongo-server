import mongoose from "mongoose";
import listingsAndReviewsSchema from "../schemas/listingsAndReviews.js";

const ListingsAndReview = mongoose.model(
  "ListingsAndReviews",
  listingsAndReviewsSchema
);
export default ListingsAndReview;