
const mongoose = require('mongoose');
require('dotenv').config();

//const mongoose = require('mongoose');
//const mongoose = require("mongoose"); // require mongoose package
//require('dotenv').config();

// connect to db

const db = mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to the MongoDB ${mongoose.connection.name}!`);
});

module.exports = db;

// this is the second way to do it to connec to db.
// const methodOverride = require("method-override"); // can only get and post on form so use this to update and delete
// const morgan = require("morgan");
// //const Book = require("./models/users.js"); // Import the Book Model
// const User = require('./models/users.js');


// import { MongoClient } from "mongodb";
// import dotenv from "dotenv"; // user this envi libaray

// dotenv.config();  // that loads the .env file

// const client = new MongoClient(process.env.MONGODB_URI);

// let conn;
// try {
//   conn = await client.connect();
// } catch (e) {
//   console.error(e);
// }

// let db = conn.db("users_posts_comments");

//export default db;
