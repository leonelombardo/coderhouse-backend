const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        index: true,
        unique: true
    },
    age: Number,
    password: String,
    cart: [],
    role: String
});

const Users = mongoose.model("users", userSchema);

module.exports = Users;