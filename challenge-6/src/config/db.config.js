require("dotenv").config()

module.exports = {
    MONGODB_USER: process.env.MONGODB_USER,
    MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
    MONGODB_CLUSTER: process.env.MONGODB_CLUSTER,
    MONGODB_DB: process.env.MONGODB_DB
}