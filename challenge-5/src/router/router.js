const usersController = require("../controllers/users.controller")
const authController = require("../controllers/auth.controller")
const viewsController = require("../controllers/views.controller")

const router = app => {
    app.use("/users", usersController)
    app.use("/auth", authController)
    app.use("/", viewsController)
}

module.exports = router