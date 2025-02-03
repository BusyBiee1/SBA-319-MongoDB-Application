// DEPENDENCIES!
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    car_id: {type: Number, required: true, minimum: 1, unique: true},  
    make: {type: String, required: true},
    model: { type:  String, required: true },
    year: { type: Number, required: true, minimum: 4 },
    // comma above is just in case I add another... key value pair
}, { versionKey: false }); // suppresses the __v field in the db

carSchema.index({ model: 1}); // create index on model

const Car = mongoose.model("Car", carSchema) // create our model!
module.exports = Car;

