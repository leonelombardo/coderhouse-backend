import { productsController } from "../controllers/products.controller.js"
import { cartsController } from "../controllers/carts.controller.js"
import { messagesController } from "../controllers/messages.controller.js"
import { chatsController } from "../controllers/chats.controller.js"
import { realtimeProductsController } from "../controllers/realtimeProducts.controller.js"

export const router = (app) => {
    app.use("/products", productsController)
    app.use("/carts", cartsController)
    app.use("/messages", messagesController)
    app.use("/chat", chatsController)
    app.use("/", realtimeProductsController)
}