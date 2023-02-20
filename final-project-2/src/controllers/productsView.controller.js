import { Router } from "express"
import { ProductManager } from "../dao/managers/mongodb_managers/product.manager.js"
import { PORT } from "../config/server.config.js"

const productManager = new ProductManager()

export const productsViewController = Router()

productsViewController.get("/", async (req, res, next) => {
    const { page } = req.query

    try{
        const response = await productManager.getProducts(3, page)

        const { prevPage, nextPage, hasPrevPage, hasNextPage } = response
        const prevLink = hasPrevPage ? `localhost:${PORT}/products?page=${response.page - 1}` : null
        const nextLink = hasNextPage ? `localhost:${PORT}/products?page=${response.page + 1}` : null
        
        res.status(response.status).render("products.handlebars", { products: response.response, prevPage, nextPage, page: response.page, hasPrevPage, hasNextPage, prevLink, nextLink, style: "home.css", title: "Products" })
    }catch(error){
        next(error)
    }
})