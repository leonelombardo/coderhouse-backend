import { Router } from "express"
import { CartManager } from "../dao/managers/mongodb_managers/cart.manager.js"

export const cartsController = Router()

const cartManager = new CartManager()

cartsController.get("/", async (req, res, next) => {
    try{
        const response = await cartManager.getCarts()
        
        res.status(response.status).json(response)
    }catch(error){
        next(error)
    }
})

cartsController.get("/:id", async (req, res, next) => {
    const { id } = req.params

    try{
        const response = await cartManager.getCartById(id)

        res.status(response.status).json(response)
    }catch(error){
        next(error)
    }
})

cartsController.post("/", async (req, res, next) => {
    try{
        const response = await cartManager.createCart()

        res.status(response.status).json(response)
    }catch(error){
        next(error)
    }
})

cartsController.post("/:cartId/product/:productId", async (req, res, next) => {
    const { cartId, productId } = req.params

    try{
        const response = await cartManager.addProductToCart(cartId, productId)

        res.status(response.status).json(response)
    }catch(error){
        next(error)
    }
})

cartsController.put("/:id", async (req, res, next) => {
    const { id } = req.params
    const { products } = req.body

    try{
        const response = await cartManager.updateProducts(id, products)

        res.status(response.status).json(response)
    }catch(error){
        next(error)
    }
})

cartsController.put("/:cartId/product/:productId", async (req, res, next) => {
    const { cartId, productId } = req.params
    const { quantity } = req.body

    try{
        const response = await cartManager.updateProductQuantity(cartId, productId, quantity)

        res.status(response.status).json(response)
    }catch(error){
        next(error)
    }
})

cartsController.delete("/:cartId/product/:productId", async (req, res, next) => {
    const { cartId, productId } = req.params

    try{
        const response = await cartManager.deleteProductFromCart(cartId, productId)

        res.status(response.status).json(response)
    }catch(error){
        next(error)
    }
})

cartsController.delete("/:id", async (req, res, next) => {
    const { id } = req.params

    try{
        const response = await cartManager.deleteProductsFromCart(id)

        res.status(response.status).json(response)
    }catch(error){
        next(error)
    }
})

cartsController.delete("/delete-cart/:id", async (req, res, next) => {
    const { id } = req.params

    try{
        const response = await cartManager.deleteCart(id)
        
        res.status(response.status).json(response)
    }catch(error){
        next(error)
    }
})