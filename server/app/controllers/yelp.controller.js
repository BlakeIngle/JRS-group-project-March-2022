const axios = require("axios");
const YELP_URL = `https://api.yelp.com/v3/businesses`;
const API_KEY = require("../config/yelp.config").key;

const yelp = axios.create({
  baseURL: YELP_URL,
  headers: { Authorization: `Bearer ${API_KEY}` },
});

exports.getRestaurantsNearZipCode = (zipcode) => {
  return yelp.get(
    `/search?location=${zipcode}&categories=restaurants&radius=10000`
  );
};

exports.searchRestaurantsByName = (name, location) => {
  return yelp.get(
    `/search?term=${name}&categories=restaurants&location=${location}`
  );
};
