const axios = require("axios");
const db = require("../index");
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
    .get(
      `/search?term=${name}&location=${location}&categories=restaurants&sort_by=distance`
    )
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

exports.getRestaurantsByDish = (req, res) => {
  const { latitude, longitude, location } = req.query;
  const { dishName } = req.params;

  //if latitude and longitude -> use those
  //  else if location -> use that (zip code, address, state, city etc.)
  let locationParam = "";
  if (latitude && longitude) {
    locationParam = `latitude=${latitude}&longitude=${longitude}&`;
  } else if (location) {
    locationParam = `location=${location}&`;
  }

  console.log(locationParam);

  locationParam = "location=Charleston, SC&";
  console.log(
    `/search?${locationParam}categories=restaurants&sort_by=distance&limit=50`
  );

  yelp
    .get(
      `/search?${locationParam}categories=restaurants&sort_by=distance&limit=50`
    )
    .then((results) => {
      console.log(results.data.businesses[0]);
      try {
        sortRestaurantsByRank(results.data.businesses, res, dishName);
      } catch (error) {
        console.log("its not working???");
        res
          .status(500)
          .send({ error: error, message: "the error is not from yelp" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "There was a problem getting restaurants",
        error: err,
      });
    });
};

/**
 *
 * @param {any[]} businesses - array of businesses from Yelp Fusion API
 */
function sortRestaurantsByRank(businesses, res, dishName) {
  // buisnisess -> [restaurant1, restaurant2, ...]
  console.log("were here now", businesses);

  var restaruantIds = businesses.map((b) => b.id);

  var qMarks = businesses
    .map((b) => "?, ")
    .join("")
    .slice(0, -2); // remove last comma

  const query = `SELECT review.restaurantId, COUNT(*) AS total
                    FROM review
                    INNER JOIN dishes.dish
                      ON dish.id = review.dishId
                    WHERE dish.name = ?
                      AND restaurantId IN(${qMarks})
                    GROUP BY restaurantId
                    ORDER BY total DESC;`;

  const placeholders = [dishName, ...restaruantIds];

  db.query(query, placeholders, (error, results) => {
    if (error) {
      res.status(500).send({
        error: err,
        message: "There was an error sorting restaurants",
      });
    } else {
      if (results.length === 0) {
        // no sorting required -> actually, sorting already 'done', no buisnesses were voted on
        res.send({ restaurants: businesses });
      } else {
        // sort the actual restaurants array from yelp to match our ranked list
        res.send({ restaurants: reorderBuisnesses(businesses, results) });
      }
    }
  });
}

/**
 *
 * @param {any[]} businesses - business objects from Yelp Fusion API
 * @param {{restaurantId, total}[]} idsInOrder - ordered list of restaurant ids from our DB
 */
function reorderBuisnesses(businesses, idsInOrder) {
  for (var i = idsInOrder.length - 1; i >= 0; i--) {
    let id = idsInOrder[i].restaurantId;
    let total = idsInOrder[i].total;

    let ri = businesses.findIndex((b) => b.id === id);
    let restaurant = businesses[ri];

    restaurant.total_favorites = total;

    businesses.unshift(restaurant);
    businesses.splice(ri, 1);
  }

  return businesses;
}
