const db = require("../index");
const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.getUserById = (req, res) => {
  const { userId } = req.params;

  const query = `SELECT user.id, user.email, user.password, 
                        user.firstName 
                    FROM user
                    WHERE user.id = ? ;`;

  const placeholders = [userId];

  db.query(query, placeholders, (err, results) => {
    if (err) {
      res.status(500).send({ error: err, message: "Error retrieving user." });
    } else {
      if (results.length == 0) {
        res.status(404).send({ message: "No user found." });
      } else {
        var user = results[0];
        res.send({ user });
      }
    }
  });
};

exports.getUserByEmail = (email, res) => {
  const query = `SELECT user.id, user.email, user.password, user.firstName
                    FROM dishes.user
                    WHERE user.email = ? ;`;

  const placeholders = [email];

  db.query(query, placeholders, (err, results) => {
    if (err) {
      res.status(500).send({ error: err, message: "Error retrieving user." });
    } else {
      if (results.length == 0) {
        res.status(404).send({ message: "No user found." });
      } else {
        var user = results[0];
        res.send({
          user,
        });
      }
    }
  });
};

exports.registerUser = async (req, res) => {
  const { email, password, firstName } = req.body;

  if (!(email && password)) {
    res.status(404).send({ message: "invalid input" });
  }

  const query = `INSERT INTO dishes.user (id, email, password, firstName)
                    VALUES (?, ?, ?, ?);`;

  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  var id = uuid();
  const placeholders = [id, email, encryptedPassword, firstName];

  db.query(query, placeholders, (err, results) => {
    if (err) {
      res.status(500).send({ error: err, message: "Error adding new user." });
    } else {
      // password and email with match. Row was just created
      this.login(req, res);
    }
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM dishes.user
                    WHERE email = ?;`;

  const placeholders = [email];

  db.query(query, placeholders, async (err, results) => {
    if (err) {
      res.status(500).send({
        error: err,
        message: "Error logging in.",
      });
    } else {
      if (results.length == 0) {
        res.status(404).send({
          message: "Email or Password was incorrect.",
        });
        return;
      } else {
        // logic
        const passwordMatched = await bcrypt.compare(
          password,
          results[0].password
        );

        if (passwordMatched) {
          // password correct
          var user = results[0];

          const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
          // save user token
          user.token = token;

          res.send({ user });
        } else {
          // password incorrect
          res.status(401).send({
            message: "Email or Password was incorrect.",
          });
        }
      }
    }
  });
};

exports.updateUserById = (req, res) => {
  const { userId } = req.params;

  const pairs = Object.entries(req.body);

  var setsString = "";
  var isStarted = false;
  const placeholders = [];

  for (let i = 0; i < pairs.length; i++) {
    let [key, value] = pairs[i];
    if (key === "id") {
      continue;
    }
    setsString += `${isStarted ? "," : ""} ?? = ? `;
    isStarted = true;
    placeholders.push(key, value);
  }

  var query = `UPDATE user
        SET ${setsString}
        WHERE id = ? ;`;
  placeholders.push(userId);

  db.query(query, placeholders, (err, results) => {
    if (err) {
      res.status(500).send({ error: err, message: "Error updating user." });
    } else {
      res.send({
        results,
        message: "User updated successfully.",
      });
    }
  });
};

exports.deleteUserById = (req, res) => {
  const { userId } = req.params;

  const query = `DELETE FROM user
                    WHERE id = ? ;`;

  const placeholders = [userId];

  db.query(query, placeholders, (err, results) => {
    if (err) {
      res.status(500).send({ error: err, message: "Error deleting user." });
    } else {
      if (results.affectedRows == 0) {
        res.status(404).send({
          message: "Cannot delete user. No user found.",
          results,
        });
      } else {
        res.send({
          results,
          message: "User deleted successfully.",
        });
      }
    }
  });
};
