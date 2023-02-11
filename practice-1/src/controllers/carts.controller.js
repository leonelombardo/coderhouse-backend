import { Router } from "express"
import { CartManager } from "../dao/managers/cart.manager.js"

export const cartsController = Router()

const cartManager = new CartManager("carts.json")

cartsController.get("/", async (req, res) => {
    try{
        const response = await cartManager.getData()
        res.status(response.status).json(response)
    }catch(error){
        res.status(500).json({ status: 500, ok: false, response: "Internal server error." })
    }
})

cartsController.get("/:id", async (req, res) => {
    const { id } = req.params

    try{
        const response = await cartManager.getDataById(id)
        res.status(response.status).json(response)
    }catch(error){
        res.status(500).json({ status: 500, ok: false, response: "Internal server error." })
    }
})

cartsController.post("/", async (req, res) => {
    try{
        const response = await cartManager.createCart()

        res.status(response.status).json(response)
    }catch(error){
        res.status(500).json({ status: 500, ok: false, response: "Internal server error." })
    }
})

cartsController.post("/:cartId/product/:productId", async (req, res) => {
    const { cartId, productId } = req.params

    try{
        const response = await cartManager.addProduct(cartId, productId)

        res.status(response.status).json(response)
    }catch(error){
        res.status(500).json({ status: 500, ok: false, response: "Internal server error." })
    }
})

cartsController.delete("/:id", async (req, res) => {
    const { id } = req.params

    try{
        const response = await cartManager.delete(id)
        
        res.status(response.status).json(response)
    }catch(error){
        res.status(500).json({ status: 500, ok: false, response: "Internal server error." })
    }
})