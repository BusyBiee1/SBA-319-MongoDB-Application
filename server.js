// DEPENDENCIES
const express = require('express');
const app = express();
const bodyParser = require("body-parser");

const usersRoute = require("./routes1/users");
//const customMiddleWareRoute = require("./routes/customMiddleWare");
//const postsRoute = require("./routes/posts");
//const commentsRoute = require("./routes/comments");
//const error = require("./utilities/error");

//const mongoose = require('mongoose'); // require mongoose package
//const methodOverride = require("method-override"); // can only get and post on form so use this to update and delete
//const morgan = require("morgan");
require('dotenv').config();
//const Book = require("./models/users.js"); // Import the Book Model
const User = require('./models/users.js');

// MIDDLEWARE
// Connect mongodb using connection string in the .env file
// Console log connection status at start
//mongoose.connect(process.env.MONGODB_URI);
//mongoose.connection.on("connected", () => {
//    console.log(`Connected to MongoDB ${mongoose.connection.name}!`)
//});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));


// Routes
app.use("/users", usersRoute);
//app.use("/api/users/customMiddleWare", customMiddleWareRoute);
//app.use("/api/posts", postsRoute);
//app.use("/api/comments", commentsRoute);


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
//app.use((err, req, res, next) => {
//const status = err.status || 500;
//res.status(status).json({
//    error: {
//    message: err.message,
//    status
//    },});
//});

// PORT STUFF!
//let port = 3000;
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log("Server Listening On Port: ", PORT);
});



// //get all users
// //get localhost:3010/users
// app.get('/users', async (req, res) => {
//     //console.log("inside get all users route",req.body);
//     let users = await User.find();
//     res.send(users);
// //    res.send("List of all users:" + "\n" + JSON.stringify(users));
// })

// //post/create a new user
// //Post localhost:3000/users
// /*
// {
// "name": "nameRaj1",
// "username": "usernameRaj1",
// "email": "emailRaj1.com"
// }
// */
// app.post('/users', async (req, res) => {
//     //await Book.create(req.body);
//     console.log("inside post a users route",req.body);
//     let result = await User.findOne().sort({user_id: -1});
//     req.body.user_id = result.user_id+1;
//     console.log(result);
//     await User.create(req.body);
//     res.send(req.body);
//     //    res.send("user created:",  + "\n" + JSON.stringify(req.body));
// })

// //get a user by id
// //get localhost:3000/users/1
// app.get('/users/:id', async (req, res) => {
//     console.log("req.params.id:", req.params.id);
//     let user = await User.findOne(req.params.id);
//     //res.send("user of ID:", + JSON.stringify(user));    
//     res.send(user);
// })

// //patch/edit a user by id
// //patch localhost:3000/users/1
// app.patch('/users/:id', async (req, res) => {
//     const userData = User.find((u, i) => {
//         if (u.id == req.params.id) {
//         for (const key in req.body) {
//             Users[i][key] = req.body[key];
//         }
//         return true;
//         }
//     });
//     if (userData) 
//         res.json(userData);
// })

// //delete a user by id
// //delete ocalhost:3000/users/1
// app.delete('/users/:id',  async (req, res) => {
//     await Book.findByIdAndDelete(req.params.bookId)
//     res.send("user deleted: "+ JSON.stringify(req.params.bookId))
// });


