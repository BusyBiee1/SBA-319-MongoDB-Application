// DEPENDENCIES!
const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
    review_id: {type: Number, required: true, minimum: 1, unique: true},  
    user_id: {type: Number, required: true, minimum: 1, unique: true},  
    car_id: {type: Number, required: true, minimum: 1, unique: true},  
    review: {type: String, required: true},
    // comma above is just in case I add another... key value pair
}, { versionKey: false }); // suppresses the __v field in the db

reviewsSchema.index({ review: 1}); // create index on review

const Review = mongoose.model("Review", reviewsSchema) // create our model!
module.exports = Review;