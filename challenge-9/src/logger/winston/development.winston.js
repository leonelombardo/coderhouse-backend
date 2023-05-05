const winston = require("winston");
const options = require("./options/development.options");

const logger = winston.createLogger({
    levels: options.levels,
    transports: [
        new winston.transports.Console({
            level: "debug",
            format: winston.format.combine(
                winston.format.colorize({ colors: options.colors }),
                winston.format.simple()
            )
        })
    ]
})

module.exports = logger;