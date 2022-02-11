module.exports = (app) => {
  const reviews = require("../controllers/review.controller");

  app.get("/api/reviews/:userId", reviews.getReviewByUserId);
  app.get("/api/reviews/dishes/:dishId", reviews.getReviewsByDishId);
  app.get(
    "/api/reviews/restaurants/:restaurantId",
    reviews.getReviewByRestaurantId
  );

  app.post("/api/reviews", reviews.addNewReview);

  app.put("/api/reviews/:userId", reviews.updateReview);

  app.delete("/api/reviews/:reviewId", reviews.deleteReviewByReviewId);
};
