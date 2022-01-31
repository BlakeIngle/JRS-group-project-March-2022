const db = require('../index');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const saltRounds = 10;


exports.getUserById = (req, res) => {

    const { id } = req.params;
    console.log("getting userId: ", id)

    const query = `SELECT users.id, users.email, users.password, 
                        users.name, books.id as 'bookId', books.title, 
                        books.author, books.publisher, books.year, 
                        books.cover  
                    FROM users
                        LEFT JOIN books
                            ON users.favoriteBook = books.id
                    WHERE users.id = ? ;`;

    const placeholders = [id];

    db.query(query, placeholders, (err, results) => {
        if (err) {
            res.status(500)
                .send({ error: err, message: "Error retrieving user." })
        } else {
            if (results.length == 0) {
                res.status(404)
                    .send({ message: "No user found." });
            } else {
                var user = results[0];
                user = rebuildUser(user);

                res.send({ user });
            }
        }
    });
}

const rebuildUser = (user) => {
    user = {
        ...user,
        favoriteBook: {
            id: user.bookId,
            title: user.title,
            author: user.author,
            publisher: user.publisher,
            year: user.year,
            cover: user.cover
        }
    }

    delete user.bookId;
    delete user.title;
    delete user.author;
    delete user.publisher;
    delete user.year;
    delete user.cover;

    return user;
}

const getUserByEmail = (email, res) => {

    const query = `SELECT users.id, users.email, users.password, 
                        users.name, books.id as 'bookId', books.title, 
                        books.author, books.publisher, books.year, 
                        books.cover  
                    FROM users
                        LEFT JOIN books
                            ON users.favoriteBook = books.id
                    WHERE users.email = ? ;`;

    const placeholders = [email];

    db.query(query, placeholders, (err, results) => {
        if (err) {
            res.status(500)
                .send({ error: err, message: "Error retrieving user." })
        } else {
            if (results.length == 0) {
                res.status(404)
                    .send({ message: "No user found." });
            } else {
                var user = results[0];
                user = rebuildUser(user);
                console.log("sending new user back")
                res.send({
                    user,
                    message: "User added successfully." // upon creation
                });
            }
        }
    });
}

exports.registerUser = async (req, res) => {

    const { id, email, password, name } = req.body;

    if (!(email && password)) {
        res.status(404)
            .send({ message: "invalid input" })
    };

    const query = `INSERT INTO users (id, email, password, name)
                    VALUES (?, ?, ?, ?);`;

    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    const placeholders = [id, email, encryptedPassword, name];

    db.query(query, placeholders, (err, results) => {
        if (err) {
            res.status(500)
                .send({ error: err, message: "Error adding new user." })
        } else {
            // password and email with match. Row was just created
            login(req, res);
        }
    });
}

exports.login = (req, res) => {

    const { email, password } = req.body;

    const query = `SELECT * FROM users 
                    WHERE email = ?;`;

    const placeholders = [email];

    db.query(query, placeholders, async (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: "Error loging in."
            })
        } else {
            if (results.length == 0) {
                res.status(404).send({
                    message: "Email or Password was incorrect."
                });
                return;
            } else {
                // logic
                const passwordMatched = await bcrypt.compare(password, results[0].password);

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
                        message: "Email or Password was incorrect."
                    });
                }
            }
        }
    });
}


exports.updateUserById = (req, res) => {
    res.send({ message: "Token is valid" });
}