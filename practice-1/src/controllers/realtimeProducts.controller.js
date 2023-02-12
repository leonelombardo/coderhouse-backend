import { Router } from "express"
import { io } from "../app.js"
import { ProductManager } from "../dao/managers/mongodb_managers/product.manager.js"

export const realtimeProductsController = Router()

const productManager = new ProductManager()

realtimeProductsController.get("/", async (req, res) => {
    try{
        const response = await productManager.getProducts()

        res.status(response.status).render("home.handlebars", { products: response.response.length && response.response, style: "home.css", title: "Products | Home" })
    }catch(error){
        res.status(500).json({ status: 500, ok: false, response: "Internal server error." })
    }
})

realtimeProductsController.get("/realtimeproducts", async (req, res) => {
    try{
        const response = await productManager.getProducts()
        
        res.status(200).render("realtimeProducts.handlebars", { products: response.response.length ? response.response : false, style: "realtimeProducts.css", title: "Products | Realtime" })
    }catch(error){
        console.log(error)
        res.status(500).json({ status: 500, ok: false, response: "Internal server error." })
    }
})

realtimeProductsController.post("/realtimeproducts", async (req, res) => {
    const { title, description, category, price, code, status=true, stock, thumbnails } = req.body
    const product = { title, description, category, price, code, status, stock, thumbnails }

    try{
        const products = await productManager.getProducts()
        
        if(!products.response.length){
            const response = await productManager.createProduct(product)
            
            io.emit("new-product", product)

            return res.status(response.status).json(response)
        }

        const isRepeated = products.response.find(x => x.code === code)
        
        if(isRepeated) return res.status(400).json({ status: 400, ok: false, response: "This product code already exists." })
        
        const response = await productManager.createProduct(product)
        const updatedProducts = await productManager.getProducts()

        io.emit("new-product", updatedProducts.response)

        res.status(response.status).json(response)
    }catch(error){
        res.status(500).json({ status: 500, ok: false, response: "Internal server error." })
    }
})

realtimeProductsController.delete("/:id", async (req, res) => {
    const { id } = req.params
    
    try{
        const response = await productManager.deleteProduct(id)
        const products = await productManager.getProducts()

        response.ok && io.emit("product-deleted", products.response)
        
        res.status(response.status).json(response)
    }catch(error){
        res.status(500).json({ status: 500, ok: false, response: "Internal server error." })
    }
})