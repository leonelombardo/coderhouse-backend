const winston = require("winston");
const options = require("./options/production.options");

const logger = winston.createLogger({
    levels: options.levels,
    transports: [
        new winston.transports.Console({
            levels: "info",
            format: winston.format.combine(
                winston.format.colorize({ colors: options.colors }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: process.cwd() + "/src/logs/errors.log",
            level: "error",
            format: winston.format.simple()
        })
    ]
})

module.exports = logger;