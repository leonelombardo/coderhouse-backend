const mongoose = require("mongoose");
const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_CLUSTER } = require("../config/mongodb.config");

const connect = () => {
    try{
        mongoose.connect(`mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}.mongodb.net/practice-2?retryWrites=true&w=majority`);
        console.log("MongoDB connected.");
    }catch(error){
        console.log(error);
    }
}

module.exports = { connect }