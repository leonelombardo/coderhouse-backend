const mockingsController = require("../controllers/mocking.controller");

const router = app => {
    app.use("/mocking", mockingsController);
}

module.exports = router;