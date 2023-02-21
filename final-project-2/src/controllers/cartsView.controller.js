import { Router } from "express"
import { CartManager } from "../dao/managers/mongodb_managers/cart.manager.js"

const cartManager = new CartManager()

export const cartsViewController = Router()

cartsViewController.get("/:id", async (req, res, next) => {
    const { id } = req.params
    
    try{
        const response = await cartManager.getCartById(id)
        const products = response.response[0].products
        
        res.status(response.status).render("cart.handlebars", { id: response.response[0].id, products, style: "home.css", title: "Carts | Home" })
    }catch(error){
        next(error)
    }
})