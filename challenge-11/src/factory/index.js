const { NODE_ENV } = require("../config/server.config");
const connectMongo = require("../db/mongo.db");

switch(NODE_ENV){
    case "local":
        module.exports = {
            CartsDAO: require("../dao/local/carts.local"),
            ProductsDAO: require("../dao/local/products.local"),
            UsersDAO: require("../dao/local/users.local"),
            AuthDAO: require("../dao/local/auth.local"),
            TicketsDAO: require("../dao/local/tickets.local")
        }

        console.log("local environment.")
    break;
    case "production":
        module.exports = {
            CartsDAO: require("../dao/mongo/carts.mongo"),
            ProductsDAO: require("../dao/mongo/products.mongo"),
            UsersDAO: require("../dao/mongo/users.mongo"),
            AuthDAO: require("../dao/mongo/auth.mongo"),
            TicketsDAO: require("../dao/mongo/tickets.mongo")
        }
        
        connectMongo();

        console.log("production environment.")
    break;
}