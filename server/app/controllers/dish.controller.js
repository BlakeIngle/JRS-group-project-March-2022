const db = require("../index");
const yelp = require("./yelp.controller");

exports.getAllDishes = (req, res) => {
  // contact sql, get all (*) -> send data back to client
  const query = "SELECT * FROM dishes.dish;";

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send({ error: err, message: "Error retrieving dishes." });
    } else {
      if (results.length == 0) {
        res.status(404).send({ message: "No dishes found." });
      } else {
        res.send({ dishes: results });
      }
    }
  });
};

exports.getDishById = (req, res) => {
  const { dishId } = req.params;

  const query = `SELECT * FROM dishes WHERE id = ?;`;
  const placeholders = [dishId];

  db.query(query, placeholders, (err, results) => {
    if (err) {
      res.status(500).send({ error: err, message: "Error retrieving dish." });
    } else {
      if (results.length == 0) {
        res.status(404).send({ message: "No dish found." });
      } else {
        res.send({ dish: results[0] });
      }
    }
  });
};

exports.getDishByLocation = (req, res) => {
  const { location } = req.params;

  yelp
    .getRestaurantsNearZipCode(location)
    .then((result) => {
      console.log(result.data.businesses);
      // send request to our DB
      res.send(result.data.businesses);
    })
    .catch((error) => {
      console.log("ERROR:", error);
      res.status(500).send({
        error: error,
        message: "There was a problem getting restaurants",
      });
    });
};

exports.getRestaurant = (req, res) => {
  const { name, location } = req.params;

  yelp
    .searchRestaurantsByName(name, location)
    .then((result) => {
      console.log(result.data.businesses);
      res.send(result.data.businesses);
    })
    .catch((error) => {
      console.log("ERROR:", error);
      res.status(500).send({
        error: error,
        message: "There was a problem getting restaurants",
      });
    });
};

exports.getDishesByQuery = (req, res) => {
  var query = `SELECT * FROM dishes.dish 
                    WHERE `;

  var isAndAdded = false;
  var placeholders = [];

  for (let prop in req.query) {
    if (isAndAdded) {
      query += "AND ";
    }
    isAndAdded = true;
    query += `${prop} LIKE ? `;
    placeholders.push(`%${req.query[prop]}%`);
  }
  query += ";";

  db.query(query, placeholders, (err, results) => {
    if (err) {
      res.status(500).send({ error: err, message: "Error retrieving dishes." });
    } else {
      if (results.length == 0) {
        res.status(404).send({ message: "No dishes found." });
      } else {
        res.send({ dishes: results });
      }
    }
  });
};

exports.addNewDish = (req, res) => {
  const pairs = Object.entries(req.body);

  var columns = ""; // `id, name, location`
  var values = ""; // `123, 'Pizza', 'Charleston'`
  const placeholders = [];

  for (let i = 0; i < pairs.length; i++) {
    let [key, value] = pairs[i];
    columns += (i != 0 ? ", " : "") + "??";
    placeholders.push(key);
  }

  for (let i = 0; i < pairs.length; i++) {
    let [key, value] = pairs[i];
    values += (i != 0 ? ", " : "") + "?";
    placeholders.push(value);
  }

  const query = `INSERT INTO dishes.dish (${columns})
                    values (${values});`;

  db.query(query, placeholders, (err, results) => {
    if (err) {
      res.status(500).send({ error: err, message: "Error posting dish." });
    } else {
      res.send({
        message: "Dish posted successfully.",
        results: results,
      });
    }
  });
};

exports.updateDish = (req, res) => {
  var { name, location, id } = req.body;

  // send the correct SQL script to the DB
  var query = `UPDATE dishes.dish
                    SET 
                        name = ? ,
                        location = ? ,
                    WHERE id = ? ;`;

  var placeholders = [name, location, id];

  db.query(query, placeholders, (err, results) => {
    if (err) {
      res.status(500).send({ error: err, message: "Error updating dish." });
    } else {
      res.send({
        message: "Dish updated successfully.",
        results: results,
      });
    }
  });
};

exports.deleteDishById = (req, res) => {
  var { dishId } = req.params;

  var query = `DELETE FROM dishes.dish
	                WHERE id = ? ;`;

  var placeholders = [dishId];

  db.query(query, placeholders, (err, results) => {
    if (err) {
      res.status(500).send({ error: err, message: "Error deleting dish." });
    } else {
      res.send({
        message: "Dish deleted successfully.",
        results: results,
      });
    }
  });
};
