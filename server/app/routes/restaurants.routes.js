module.exports = (app) => {
  const yelp = require("../controllers/yelp.controller");

  app.get("/api/restaurants", yelp.getRestaurantsByQuery);
  app.get("/api/restaurants/:dishName", yelp.getRestaurantsByDish);
};
