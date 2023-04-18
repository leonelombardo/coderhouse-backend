const mongoose = require("mongoose");
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST, MONGO_DATABASE } = require("../config/mongo.config");

const connectMongo = async () => {
    try{
        await mongoose.connect(`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DATABASE}?retryWrites=true&w=majority`);
    
        console.log(`mongo connected.`);
    }catch(error){
        console.log(error);
    }
}

module.exports = connectMongo;