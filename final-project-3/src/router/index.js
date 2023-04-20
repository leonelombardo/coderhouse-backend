const cartsController = require("../controllers/carts.controller");
const productsController = require("../controllers/products.controller");
const usersController = require("../controllers/users.controller");
const authController = require("../controllers/auth.controller");
const ticketsController = require("../controllers/tickets.controller");
const sessionsController = require("../controllers/sessions.controller");

const router = app => {
    app.use("/api/carts", cartsController);
    app.use("/api/products", productsController);
    app.use("/api/users", usersController);
    app.use("/api/auth", authController);
    app.use("/api/tickets", ticketsController);
    app.use("/api/sessions", sessionsController);
}

module.exports = router;