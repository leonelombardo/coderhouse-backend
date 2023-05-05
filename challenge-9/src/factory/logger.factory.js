const { ENVIRONMENT } = require("../config/server.config");

switch(ENVIRONMENT){
    case "development":
        console.log("logger running in development environment.");
        module.exports = require("../logger/winston/development.winston")
    break;
    case "production":
        console.log("logger running in production environment.");
        module.exports = require("../logger/winston/production.winston")
    break;
    default: 
    break;
}