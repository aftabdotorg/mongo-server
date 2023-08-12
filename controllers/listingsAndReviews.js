import ListingsAndReview from "../models/listingsAndReviews.js";

const getListingsAndReviwes = async (req, res) => {
  const { page } = req.query;
  let data;
  let hasNextPage = false;
  const totalCount = await ListingsAndReview.count();
  if (page) {
    if (page * 10 < totalCount) hasNextPage = true;

    data = await ListingsAndReview.find()
      .skip((page - 1) * 10)
      .limit(10);

    return res.send({ data, totalCount, count: data.length, hasNextPage });
  }
  data = await ListingsAndReview.find().limit(10);

  return res.send({ data, totalCount, hasNextPage, count: 10 });
};
const createListingsAndReviwes = async (req, res) => {
  return res.send(await ListingsAndReview.create(req.body));
};

export { getListingsAndReviwes, createListingsAndReviwes };
