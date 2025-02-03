const express = require("express")
const router = express.Router()
//
const Car = require("../models/cars");
//const usersDataFile = require("../data/users");
//const customMiddleWare = require ("../routes/customMiddleWare");
//const Utilserror = require("../utilities/error");
//const postsDataFile = require("../data/posts");
const db = require("../db/conn.js");

router
// get all cars
// localhost:3010\cars\
.get("/", async (req, res) => {
    console.log("get all cars");
    let result = await Car.find().limit(10);
    res.status(200).send(result);
})
//add a new car
//localhost:3010\cars\
.post("/", async (req, res) => {
    try {
    let result = await Car.findOne().sort({car_id: -1});
    if (result.car_id) 
        req.body.car_id = result.car_id +1;
    else 
        req.body.car_id = 1;
    await Car.create(req.body);
    res.send(req.body);
    }catch (err) {
    res.status(400).send(err.message); 
    }
})

router
// get a car by id
// localhost:3010\cars\3
.get("/:id", async (req, res) => {
    //console.log("get a car by id");
    const query = await Car.findOne({car_id: req.params.id});
    if (query) {
        res.send(req.body);
    }
    else {
        res.send("No car found for that car_id: " + req.params.id);
    }
})
// edit a car by id
// localhost:3010\cars\3
//edit a car by id
/*
 {
   "make": "Toyota",
   "model": "Civic",
   "year": 2024
 }
*/
.patch("/:id", async (req, res) => {
    //console.log(req.params.id, req.body)
    try {
    let query = await Car.findOne({car_id: req.params.id});
    if (query) {
        //console.log(req.params.id, req.body)
        await Car.findOneAndUpdate({ car_id: req.params.id}, req.body);
        res.send(req.body);
    }
    else {
        res.send("No car found for that car_id: " + req.params.id);    }
    }catch (err) {
        res.status(400).send(err.message); 
    }
});
//delete a car by id
//delete localhost:3000/cars/3
router.delete("/:id", async (req, res) => {
    let query = await Car.findOne({car_id: req.params.id});
    if (query) {
        //console.log("Request to delete: ",req.params.id, req.body)
        await Car.findOneAndDelete({car_id: req.params.id});
        //res.send("A user was deleted with user_id of: "+ req.params.id);
        res.send(query);
    }
    else {
        res.send("No car found for that car_id: " + req.params.id);    }
});
  

module.exports = router;

