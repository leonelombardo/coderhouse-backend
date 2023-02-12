import { realtimeProductsController } from "../controllers/realtimeproducts.controller.js"
import { productsController } from "../controllers/products.controller.js"
import { cartsController } from "../controllers/carts.controller.js"
import { messagesController } from "../controllers/messages.controller.js"

export const router = (app) => {
    app.use("/", realtimeProductsController)
    app.use("/products", productsController)
    app.use("/carts", cartsController)
    app.use("/messages", messagesController)
}