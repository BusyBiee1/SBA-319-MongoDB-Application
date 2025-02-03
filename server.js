// DEPENDENCIES
const express = require('express');
const app = express();
const bodyParser = require("body-parser");

const usersRoute = require("./routes/users");
const carsRoute = require("./routes/cars");
const reviewsRoute = require("./routes/reviews");

require('dotenv').config();
//const User = require('./models/users.js');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// Routes
app.use("/users", usersRoute);
app.use("/cars", carsRoute);
app.use("/reviews", reviewsRoute)

// Middlewares
// Logging Middlewaare
app.use((req, res, next) => {
    const time = new Date();
    console.log(
      `-----
  ${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`);
    if (Object.keys(req.body).length > 0) {
      console.log("Containing the data:");
      console.log(`${JSON.stringify(req.body)}`);
    }
    next();
});
  
// welcome message for testing
app.get('/',(req, res) => {
    res.send("welcome to the 'welcome route'");
});

// Error-handling middleware.
// 404 Middleware for unmatched routes
app.use((req, res, next) => {
    next(error(404, 'Resource Not Found'));
});
  
// General Error Handling Middleware
app.use((err, req, res, next) => {
const status = err.status || 500;
res.status(status).json({
    error: {
    message: err.message,
    status
    },});
});

// PORT STUFF!
//let port = 3000;
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log("Server Listening On Port: ", PORT);
});

