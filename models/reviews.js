// DEPENDENCIES!
const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
    review_id: {type: Number, required: true, unique: true},  
    user_id: {type: Number, required: true},  
    car_id: {type: Number, required: true},  
    review: {type: String, required: true},
}, { versionKey: false }); // suppresses the __v field in the db


// Create a compound index to ensure a user can review multiple cars (but not duplicate the review for a single car and vice versa)
reviewsSchema.index({ user_id: 1, car_id: 1 }, { unique: true });

const Review = mongoose.model("Review", reviewsSchema) // create our model!
module.exports = Review;