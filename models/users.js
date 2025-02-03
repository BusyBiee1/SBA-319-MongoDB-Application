// DEPENDENCIES!
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id: {type: Number, required: true, unique: true},  
    name: {type: String, required: true},
    username: { type:  String, required: true },
    email: { type: String, required: true, format: "email" },
    // comma above is just in case I add another... key value pair
}, { versionKey: false }); // suppresses the __v field in the db

// Indexes
userSchema.index({ username: 1, email: 1 }, { unique: true }); // Prevents duplicate reviews from the same user

const User = mongoose.model("User", userSchema) // create our model!
module.exports = User;