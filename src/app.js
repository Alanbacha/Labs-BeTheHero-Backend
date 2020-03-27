// Requires
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const { errors } = require("celebrate");

// Requiring the routes whose was cofigured in the file bellow
const postRoutes = require("./routes");

dotenv.config();

// middleware
const app = express();

// Adding Cors to the App
app.use(cors());

// Adding bodyParser to the App
app.use(bodyParser.json());

// Using the route
app.use("/", postRoutes);
app.use(errors());

// Start a listening to the port
module.exports = app;
