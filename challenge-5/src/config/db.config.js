require("dotenv").config()

const MONGODB_USER = process.env.MONGODB_USER
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD
const MONGODB_CLUSTER = process.env.MONGODB_CLUSTER

module.exports = {
    MONGODB_USER,
    MONGODB_PASSWORD,
    MONGODB_CLUSTER
}