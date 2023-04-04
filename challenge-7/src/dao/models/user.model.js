const mongoose = require("mongoose");

const usersCollection = "users";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        index: true
    },
    age: Number,
    password: String,
    cart: {},
    role: String
});

const userModel = mongoose.model(usersCollection, userSchema);

module.exports = userModel;