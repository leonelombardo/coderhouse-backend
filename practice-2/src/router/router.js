const usersRouter = require("../controllers/users.controller");
const authRouter = require("../controllers/auth.controller")
const sessionsRouter = require("../controllers/sessions.controller")

const router = app => {
    app.use("/api/users", usersRouter.getRouter());
    app.use("/api/auth", authRouter.getRouter());
    app.use("/api/session", sessionsRouter.getRouter());
}

module.exports = { router }