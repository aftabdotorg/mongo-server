import express from "express";
import dotenv from "dotenv";
import { createClient } from "redis";

import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  // windowMs: 15 * 60 * 1000, // 15 minutes
  windowMs: 10000,
  max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // store: ... , // Use an external store for more precise rate limiting
});

dotenv.config();
import connectDB from "./db.js";
connectDB();

import listingRoutes from "./routes/listings.js";
import listingAndReviewsRoutes from "./routes/listingsAndReviews.js";

const client = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_CONNECTION_STRING,
    port: 10770,
  },
});

client.on("error", (err) => console.log(`Redis Client Error: ${err}`));
await client.connect();
export { client };

const app = express();
app.use(express.json()); // ! userfull for parsing // bodyParser
// Apply the rate limiting middleware to all requests
app.use(limiter);
const PORT = 5007;

// ! everything begining with /listing is present in function

// ! /test is health check end point which will be called every time
app.get("/test", (req, res) => res.send("Ok"));

app.use("/listings", listingRoutes);
app.use("/listingsAndReviews", listingAndReviewsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
