import { productsController } from "../controllers/products.controller.js"
import { cartsController } from "../controllers/carts.controller.js"

export const router = (app) => {
    app.use("/products", productsController)
    app.use("/carts", cartsController)
}