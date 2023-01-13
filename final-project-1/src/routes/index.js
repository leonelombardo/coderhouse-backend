import { productsRouter } from "../products/index.js"
import { cartsRouter } from "../carts/index.js"

export const useRouter = (app) => {
    app.use("/api/products", productsRouter)
    app.use("/api/carts", cartsRouter)
}