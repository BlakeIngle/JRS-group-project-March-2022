module.exports = (app) => {
  const dishes = require("../controllers/dish.controller");

  app.get("/api/dishes", dishes.getAllDishes);

  app.get("/api/dishes/search", dishes.getDishesByQuery);

  app.get("/api/dishes/:dishId", dishes.getDishById);

  app.get("/api/dishes/zip/:location", dishes.getDishByLocation);
  app.get("/api/restaurants/:location/:name", dishes.getRestaurant);

  app.get("/api/location", dishes.getDishesByQuery);

  app.post("/api/dishes", dishes.addNewDish);

  app.put("/api/dishes", dishes.updateDish);

  app.delete("/api/dishes/:dishId", dishes.deleteDishById);
};
