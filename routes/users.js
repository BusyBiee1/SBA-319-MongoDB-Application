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

