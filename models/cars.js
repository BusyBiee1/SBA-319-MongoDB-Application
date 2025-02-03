// DEPENDENCIES!
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    car_id: {type: Number, required: true, unique: true},  
    make: {type: String, required: true},
    model: { type:  String, required: true },
    year: { type: Number, required: true, min: 1900, max: 2024 },
    // comma above is just in case I add another... key value pair
}, { versionKey: false }); // suppresses the __v field in the db

// Indexes 
 carSchema.index({ model: 1 });

const Car = mongoose.model("Car", carSchema) // create our model!
module.exports = Car;

