import Listing from "../models/listings.js";

const getListings = async (req, res) => {
  // ! url params should always be noun(listing) and plural in nature not verbs (getListing)
  const { minPrice, maxPrice } = req.query;
  const allListings = await Listing.find();
  if (minPrice && maxPrice) {
    return res.send(
      allListings.filter(
        (listing) => listing.price > minPrice && listing.price <= maxPrice
      )
    );
  }

  if (minPrice) {
    return res.send(allListings.filter((listing) => listing.price > minPrice));
  }

  if (maxPrice) {
    return res.send(allListings.filter((listing) => listing.price <= maxPrice));
  }

  return res.send(allListings);
};

const getListingById = async (req, res) => {
  console.log(req.params);
  return res.send(await Listing.findById(req.params.id));
};

const createListing = async (req, res) => {
  const newListing = await Listing.create(req.body);

  return res.send({
    id: newListing._id,
    created: true,
  });
};

export { getListings, createListing, getListingById };