const express = require("express")
const router = express.Router()
//
const Review = require("../models/reviews");
//const usersDataFile = require("../data/users");
//const customMiddleWare = require ("../routes/customMiddleWare");
//const Utilserror = require("../utilities/error");
//const postsDataFile = require("../data/posts");
const db = require("../db/conn.js");

router
//.route("/")
// get all reviews
// localhost:3010\reviews\
.get("/", async (req, res) => {
    console.log("get all reviews");
    let result = await Review.find().limit(10);
    res.status(200).send(result);
})
 //add a new review
 //localhost:3010\reviews\
 .post("/", async (req, res) => {
    try {
        console.log(req.params.id, req.body)
        let result = await Review.findOne().sort({review_id: -1});
        if (result) {
            req.body.review_id = result.review_id +1;}
        else {
            req.body.review_id = 1;}
        await Review.create(req.body);
        console.log("HERE", req.body)
        res.send(req.body);
    }catch (err) 
    {
        if (err.name ==="validationError"){
            return res.status(400).send(err.message);
        }
    }
})

 router
 // get a review by id
 // localhost:3010\reviews\3
 .get("/:id", async (req, res) => {
    //console.log("get a review by id");
    const query = await Review.findOne({review_id: req.params.id});
    if (query) {
        res.send(query);
    }
    else {
        res.send("No review found for that review_id: " + req.params.id);
    }
 })
 // edit a review by id
 // localhost:3010\reviews\3
 /*
{
    "user_id": 1,
    "car_id": 1,
    "review": "I like the soom consistant performance. Smooth driving. Low gas mileage."
}
 */
 .patch("/:id", async (req, res) => {
     //console.log(req.params.id, req.body)
    try {
        let query = await Review.findOne({review_id: req.params.id});
        if (query) {
            //console.log(req.params.id, req.body)
            await Review.findOneAndUpdate({ review_id: req.params.id}, req.body);
            res.send(req.body);
        }
        else {
            res.send("No review found for that review_id: " + req.params.id);    }
        }
        catch (err) {
            if (err.name ==="validataionError"){
                return res.status(400).send(err.message);
            }
        }       
 });
 //delete a review by id
 //delete localhost:3000/reviews/3
 router.delete("/:id", async (req, res) => {
    let query = await Review.findOne({review_id: req.params.id});
    if (query) {
        //console.log("Request to delete: ",req.params.id, req.body)
        await Review.findOneAndDelete({review_id: req.params.id});
        //res.send("A review was deleted with review_id of: "+ req.params.id);
        res.send(query);
    }
    else 
    {
        res.send("No review found for that review_id: " + req.params.id);    
    }
 });

module.exports = router;

