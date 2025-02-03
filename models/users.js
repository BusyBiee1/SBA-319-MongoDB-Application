// DEPENDENCIES!
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id: {type: Number, required: true, minimum: 1, unique: true},  
    name: {type: String, required: true},
    username: { type:  String, required: true },
    email: { type: String, required: true, format: "email" },
    // comma above is just in case I add another... key value pair
}, { versionKey: false }); // suppresses the __v field in the db

userSchema.index({ username: 1}); // create index on username

const User = mongoose.model("User", userSchema) // create our model!
module.exports = User;