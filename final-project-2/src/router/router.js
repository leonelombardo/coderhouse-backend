import { productsController } from "../controllers/products.controller.js"
import { cartsController } from "../controllers/carts.controller.js"
import { messagesController } from "../controllers/messages.controller.js"
import { productsViewController } from "../controllers/productsView.controller.js"
import { cartsViewController } from "../controllers/cartsView.controller.js"
import { realtimeProductsController } from "../controllers/realtimeProducts.controller.js"

export const router = (app) => {
    app.use("/api/products", productsController)
    app.use("/api/carts", cartsController)
    app.use("/api/messages", messagesController)
    app.use("/products", productsViewController)
    app.use("/carts", cartsViewController)
    app.use("/", realtimeProductsController)
}