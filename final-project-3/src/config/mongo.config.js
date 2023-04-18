require("dotenv").config();

module.exports = {
    MONGO_USERNAME: process.env.MONGO_USERNAME,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    MONGO_HOST: process.env.MONGO_HOST,
    MONGO_DATABASE: process.env.MONGO_DATABASE
}