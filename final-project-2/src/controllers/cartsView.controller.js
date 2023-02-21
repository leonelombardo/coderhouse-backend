import { Router } from "express"
import { CartManager } from "../dao/managers/mongodb_managers/cart.manager.js"

const cartManager = new CartManager()

export const cartsViewController = Router()

cartsViewController.get("/:id", async (req, res, next) => {
    const { id } = req.params
    
    try{
        const response = await cartManager.getCartById(id)
        
        res.status(response.status).render("cart.handlebars", { id: response.response[0].id, products: response.response[0].products, style: "carts.css", title: "Carts" })
    }catch(error){
        next(error)
    }
})