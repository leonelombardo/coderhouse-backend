require("dotenv").config();

module.exports = {
    PORT: process.env.PORT || 3000,
    ENVIRONMENT: process.env.NODE_ENV || "development"
}