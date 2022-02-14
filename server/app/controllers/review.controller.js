const db = require("../index");
const yelp = require("./yelp.controller");

exports.getReviewByUserId = (req, res) => {
  const { userId } = req.params;
  const query = `SELECT review.id, review.restaurantId, review.body, dish.name AS dish
                  FROM dishes.review 
                  INNER JOIN dish
                    ON dish.id = review.dishId
                  WHERE userId = ?;`;
  const placeholders = [userId];

  db.query(query, placeholders, (err, results) => {
    if (err) {
      res.status(500).send({ error: err, message: "Error retrieving reviews" });
    } else {
      if (results.length == 0) {
        res.staus(404).send({ message: "No reviews found." });
      } else {
        res.send({ reviews: results });
      }
    }
  });
};

exports.getReviewsByDishId = (req, res) => {
  const { dishId } = req.params;

  // must be in this format: ['1', '2', '3', ...];
  const { restaurandIds } = req.body;
  const restaurantList = restaurandIds.join(",");

  const query = ` SELECT dishes.restaurantId, COUNT(*) AS total
                    FROM review 
                    WHERE dishId = ? 
                      AND restaurantId IN(?)
                    GROUP BY restaurantId
                    ORDER BY total DESC;`;

  const placeholders = [dishId, restaurantList];

  db.query(query, placeholders, (err, results) => {
    if (err) {
      res.status(500).send({ error: err, message: "Error retrieving reviews" });
    } else {
      if (results.length == 0) {
        res.staus(404).send({ message: "No reviews found." });
      } else {
        res.send({ reviews: results });
      }
    }
  });
};

exports.getReviewByRestaurantId = (req, res) => {
  const { restaurantId } = req.params;
  const query = `SELECT * FROM dishes.review WHERE restaurantId = ?;`;
  const placeholders = [restaurantId];

  db.query(query, placeholders, (err, results) => {
    if (err) {
      res.status(500).send({ error: err, message: "Error retrieving reviews" });
    } else {
      if (results.length == 0) {
        res.staus(404).send({ message: "No reviews found." });
      } else {
        res.send({ reviews: results });
      }
    }
  });
};

exports.addNewReview = (req, res) => {
  const { dishId, restaurantId, userId, body } = req.body;

  const query = `INSERT INTO dishes.review (dishId, restaurantId, userId, body)
                      values (?, ?, ?, ?);`;

  const placeholders = [dishId, restaurantId, userId, body];

  db.query(query, placeholders, (err, results) => {
    if (err) {
      res.status(500).send({ error: err, message: "Error posting review." });
    } else {
      res.send({
        message: "Review posted successfully.",
        review: results,
      });
    }
  });
};

exports.updateReview = (req, res) => {
  var { body, restaurantId } = req.body;

  var query = `UPDATE dishes.review
  SET
  body = ? ,
  restaurantId = ? ,
  WHERE id = ? ;`;
  var placeholders = [body, restaurantId];

  db.query(query, placeholders, (err, results) => {
    if (err) {
      res.status(500).send({ error: err, message: "Error updating review" });
    } else {
      res.send({
        message: "Review updated successfully.",
        review: results,
      });
    }
  });
};

exports.deleteReviewByReviewId = (req, res) => {
  var { reviewId } = req.params;

  var query = `DELETE FROM dishes.review
                WHERE id = ? ;`;
  var placeholders = [reviewId];

  db.query(query, placeholders, (err, results) => {
    if (err) {
      res.status(500).send({ error: err, message: "Error deleting review." });
    } else {
      res.send({
        message: "Review deleted successfully.",
        results: results,
      });
    }
  });
};
