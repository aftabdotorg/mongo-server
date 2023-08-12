import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db.js";
connectDB();

import listingRoutes from "./routes/listings.js";
import listingAndReviewsRoutes from "./routes/listingsAndReviews.js";

import { createClient } from "redis";
const client = createClient();
client.on("error", (err) => console.log(`Redis Client Error: ${err}`));
await client.connect();
export { client };

const app = express();
app.use(express.json()); // ! userfull for parsing // bodyParser
const PORT = 5007;

// ! everything begining with /listing is present in function

app.get("/test", (req, res) => res.send("Ok"));

app.use("/listings", listingRoutes);
app.use("/listingsAndReviews", listingAndReviewsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
