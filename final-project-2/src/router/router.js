import { productsController } from "../controllers/products.controller.js"
import { cartsController } from "../controllers/carts.controller.js"
import { messagesController } from "../controllers/messages.controller.js"
import { chatsController } from "../controllers/chats.controller.js"
import { productsViewController } from "../controllers/productsView.controller.js"
import { realtimeProductsController } from "../controllers/realtimeProducts.controller.js"

export const router = (app) => {
    app.use("/api/products", productsController)
    app.use("/api/carts", cartsController)
    app.use("/api/messages", messagesController)
    app.use("/chat", chatsController)
    app.use("/products", productsViewController)
    app.use("/", realtimeProductsController)
}