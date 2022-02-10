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

exports.searchRestaurantsByName = (name) => {
  return yelp.get(`/search?term=${name}&categories=restaurants`);
};

exports.getRestaurantsByQuery = (req, res) => {
  const { name } = req.query;
  // replace literal value with user's actual location
  const location = "Charleston, SC";

  yelp
    .get(`/search?term=${name}&location=${location}&categories=restaurants&sort_by=distance`)
    .then((results) => {
      if (results.data.length === 0) {
        res.status(404).send({ message: "No matches" });
      }
      res.send({ restaurants: results.data.businesses });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};
