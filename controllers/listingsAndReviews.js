import ListingsAndReview from "../models/listingsAndReviews.js";
import { client } from "../index.js";

const getListingsAndReviwes = async (req, res) => {
  const { page } = req.query;
  let data;
  let hasNextPage = false;
  const totalCount = await ListingsAndReview.count();
  if (page) {
    if (page * 10 < totalCount) hasNextPage = true;
    if (await client.get(`listingAndReviews?page=${page}`)) {
      console.log("Cache hit");
      return res.send({
        data: JSON.parse(await client.get(`listingAndReviews?page=${page}`)),
        totalCount,
        count: JSON.parse(await client.get(`listingAndReviews?page=${page}`))
          .length,
        hasNextPage,
      });
    }
    console.log("Cache miss");
    data = await ListingsAndReview.find()
      .skip((page - 1) * 10)
      .limit(10);
    await client.setEx(
      `listingAndReviews?page=${page}`,
      15,
      JSON.stringify(data)
    );

    return res.send({ data, totalCount, count: data.length, hasNextPage });
  }
  data = await ListingsAndReview.find().limit(10);

  await client.setEx(`listingAndReviews`, 15, JSON.stringify(data));
  return res.send({ data, totalCount, hasNextPage, count: 10 });
};
const createListingsAndReviwes = async (req, res) => {
  return res.send(await ListingsAndReview.create(req.body));
};

export { getListingsAndReviwes, createListingsAndReviwes };
