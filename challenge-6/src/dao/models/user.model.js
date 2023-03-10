const mongoose = require("mongoose")

const usersCollection = "users"

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    age: Number,
    email: {
        type: String,
        index: true
    },
    password: String
})

const userModel = mongoose.model(usersCollection, userSchema)

module.exports = userModel