import { Router } from "express"
import { ProductManager } from "../dao/managers/mongodb_managers/product.manager.js"

export const productsController = Router()

const productManager = new ProductManager()

productsController.get("/", async (req, res, next) => {
    const { limit, page, sort, query } = req.query

    try{
        const response = await productManager.getProducts(limit, page, sort, query)

        res.status(response.status).json(response)
    }catch(error){
        console.log(error)
        next(error)
    }
})

productsController.get("/:id", async (req, res, next) => {
    const { id } = req.params

    try{
        const response = await productManager.getProductById(id)

        res.status(response.status).json(response)
    }catch(error){
        next(error)
    }
})

productsController.post("/", async (req, res, next) => {
    const { title, description, category, thumbnails, stock, price, code, status=true } = req.body
    const product = { title, description, category, thumbnails, stock, price, code, status }

    try{
        const response = await productManager.createProduct(product)

        res.status(response.status).json(response)
    }catch(error){
        next(error)
    }
})

productsController.patch("/:id", async (req, res, next) => {
    const { id } = req.params
    const { title, description, category, thumbnails, stock, price, code, status } = req.body
    const product = { title, description, category, thumbnails, stock, price, code, status }
    
    try{
        const response = await productManager.updateProduct(id, product)

        res.status(response.status).json(response)
    }catch(error){
        next(error)
    }
})

productsController.put("/:id", async (req, res, next) => {
    const { id } = req.params
    const { title, description, category, thumbnails, stock, price, code, status } = req.body
    const product = { title, description, category, thumbnails, stock, price, code, status }

    try{
        const response = await productManager.updateAllProductData(id, product)

        res.status(response.status).json(response)
    }catch(error){
        next(error)
    }
})

productsController.delete("/:id", async (req, res, next) => {
    const { id } = req.params
    
    try{
        const response = await productManager.deleteProduct(id)

        res.status(response.status).json(response)
    }catch(error){
        next(error)
    }
})

productsController.delete("/", async (req, res, next) => {
    try{
        const response = await productManager.deleteAllProducts()
        
        res.status(response.status).json(response)
    }catch(error){
        next(error)
    }
})