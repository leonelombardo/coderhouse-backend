const authController = require("../controllers/auth.controller.js")
const usersController = require("../controllers/users.controller.js")
const viewsController = require("../controllers/views.controller.js")

const router = app => {
    app.use("/auth", authController)
    app.use("/users", usersController)
    app.use("/", viewsController)
}

module.exports = router