const { Router } = require("express");
const { ENVIRONMENT } = require("../config/server.config");

const loggerController = Router();

loggerController.get("/test", (req, res, next) => {
    if(ENVIRONMENT === "development"){
        req.logger.fatal(`${req.method} for testing fatal level.`);
        req.logger.error(`${req.method} for testing error level.`);
        req.logger.info(`${req.method} for testing info level.`);
        req.logger.http(`${req.method} for testing http level.`);
        req.logger.debug(`${req.method} for testing debug level.`);
        
    }
    
    if(ENVIRONMENT === "production"){
        req.logger.fatal(`${req.method} for testing fatal level.`);
        req.logger.error(`${req.method} for testing error level.`);
        req.logger.info(`${req.method} for testing info level.`);
    }

    res.status(200).json({ status: 200, ok: true });
})

module.exports = loggerController;