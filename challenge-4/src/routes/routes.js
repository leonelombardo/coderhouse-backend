import { productsRouter } from "./routes.products.js"

export const useRoutes = (app) => {
    app.use("/", productsRouter)
}