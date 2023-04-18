const cartsController = require("../controllers/carts.controller");
const productsController = require("../controllers/products.controller");

const router = app => {
    app.use("/api/carts", cartsController);
    app.use("/api/products", productsController);
}

module.exports = router;