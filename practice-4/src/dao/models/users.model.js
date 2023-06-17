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
    role: {
        type: String,
        default: "user"
    },
    cart: {
        type: Array,
        default: []
    },
    documents: {
        type: Array,
        default: []
    },
    last_connection: {
        type: Date,
        default: new Date().toLocaleString("en-US")
    }
});

const Users = mongoose.model("users", userSchema);

module.exports = Users;