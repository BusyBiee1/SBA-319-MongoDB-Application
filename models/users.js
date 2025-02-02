// DEPENDENCIES!
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id: {type: Number, required: true},
    name: {type: String, required: true},
    username: { type:  String, required: true },
    email: { type: String, required: true },
    // comma above is just in case I add another... key value pair
}, { versionKey: false });

userSchema.index({ user_id: 1}); // create index on user_id

const User = mongoose.model("User", userSchema) // create our model!
module.exports = User;