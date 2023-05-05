const logger = require("../factory/logger.factory")

const addLogger = (req, res, next) => {
    req.logger = logger;

    next();
}

module.exports = addLogger;