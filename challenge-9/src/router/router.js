const loggerController = require("../controllers/logger.controller");

const router = app => {
    app.use("/api/logger", loggerController);
}

module.exports = router;