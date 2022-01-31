const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')

require("dotenv").config();

const app = express();

var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// require("./app/index.js/index");
require('./app/routes/user.routes.js')(app);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});