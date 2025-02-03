const express = require("express")
const router = express.Router()
//
const User = require("../models/users");
//const usersDataFile = require("../data/users");
//const customMiddleWare = require ("../routes/customMiddleWare");
//const Utilserror = require("../utilities/error");
//const postsDataFile = require("../data/posts");
const db = require("../db/conn.js");

router
// get all users
// localhost:3010\users\
.get("/", async (req, res) => {
    console.log("get all users");
    let result = await User.find().limit(10);
    res.status(200).send(result);
})
//add a new user
//localhost:3010\users\
.post("/", async (req, res) => {
    let result = await User.findOne().sort({user_id: -1});
    if (result.user_id) 
        req.body.user_id = result.user_id +1;
    else 
        req.body.user_id = 1;
        //result.user_id = 1:
    await User.create(req.body);
    res.send(req.body);
})

//edit a user by id
/*
 {
   "name": "nameRaj1",
   "username": "usernameRaj1",
   "email": "emailRaj1.com"
 }
*/
router
// get a user by id
// localhost:3010\users\3
.get("/:id", async (req, res) => {
    //console.log("get a user by id");
    const query = await User.findOne({user_id: req.params.id});
    if (query) {
        res.send(req.body);
    }
    else {
        res.send("No user foudn for that id");
    }
})
// edit a user by id
// localhost:3010\users\3
.patch("/:id", async (req, res) => {
    //console.log(req.params.id, req.body)
    let query = await User.findOne({user_id: req.params.id});
    if (query) {
        //console.log(req.params.id, req.body)
        await User.findOneAndUpdate({ user_id: req.params.id}, req.body);
        res.send(req.body);
    }
    else {
        res.send("No user foudn for that id");
    }
});
//delete a user by id
//delete ocalhost:3000/users/3
router.delete("/:id", async (req, res) => {
    let query = await User.findOne({user_id: req.params.id});
    if (query) {
        //console.log("Request to delete: ",req.params.id, req.body)
        await User.findOneAndDelete({user_id: req.params.id});
        res.send("user deleted: "+ req.params.id);
    }
    else {
        res.send("No user foudn for that id");
    }
});

module.exports = router;

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




//.delete((req, res, next) => {
//    let result = await User.findOne()
//    const query = await User.findOne({user_id: req.params.id});
//    const userData = User.find((u, i) => {
//        if (user_id == req.params.id) {
//            Users.splice(i, 1);
//            res.send(req.body);
//            //return true;
//        }
//    });
//})

// //delete ocalhost:3000/users/1
// app.delete('/users/:id',  async (req, res) => {
//     await Book.findByIdAndDelete(req.params.bookId)
//     res.send("user deleted: "+ JSON.stringify(req.params.bookId))
// });


