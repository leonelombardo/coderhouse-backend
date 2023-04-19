const { NODE_ENV } = require("../config/server.config");
const connectMongo = require("../db/mongo.db");

switch(NODE_ENV){
    case "local":
        module.exports = {
            CartsDAO: require("../dao/local/carts.local"),
            ProductsDAO: require("../dao/local/products.local")
        }

        console.log("local environment.")
    break;
    case "production":
        module.exports = {
            CartsDAO: require("../dao/mongo/carts.mongo"),
            ProductsDAO: require("../dao/mongo/products.mongo")
        }
        
        connectMongo();

        console.log("production environment.")
    break;
}