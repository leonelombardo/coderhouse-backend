import { Router } from "express"
import { v4 } from "uuid"
import fs from "fs"
import { CARTS_PATH } from "../env.js"

export const cartsRouter = Router()

cartsRouter.get("/", async (req, res) => {
    try{
        const response = await fs.promises.readFile(CARTS_PATH, "utf-8")
        
        if(!response.length) return res.status(404).send( { status: 404, success: false, error: true, response: "There are no carts." })
        
        const carts = JSON.parse(response)

        res.status(200).send(carts)
    }catch(error){
        res.status(500).send(error)
    }
})

cartsRouter.get("/:id", async (req, res) => {
    const { id } = req.params
    
    try{
        const response = await fs.promises.readFile(CARTS_PATH, "utf-8")

        if(!response.length) return res.status(404).send( { status: 404, success: false, error: true, response: "There are no carts." })

        const carts = JSON.parse(response)
        const cart = carts.find(x => x.id === id && x)
    
        if(!cart) return res.status(404).send( { status: 404, success: false, error: true, response: "Cart not found." })
    
        res.status(200).send({ products: cart.products })
    }catch(error){
        res.status(500).send({ error: error })
    }
})

cartsRouter.post("/", async (req, res) => {
    try{
        const cart = { id: v4(), products: [] }
        
        const response = await fs.promises.readFile(CARTS_PATH, "utf-8")

        if(!response.length) {
            await fs.promises.writeFile(CARTS_PATH, JSON.stringify([cart], null, "\t"))
            return res.status(201).send({ status: 201, success: true, error: false, response: `Cart created.`})
        } 

        const carts = JSON.parse(response)
        
        carts.push(cart)
    
        await fs.promises.writeFile(CARTS_PATH, JSON.stringify(carts, null, "\t"))
    
        res.status(201).send({ status: 201, success: true, error: false, response: `Cart created.`})
    }catch(error){
        res.status(500).send({ error: error })
    }   
})

cartsRouter.post("/:cartId/product/:productId", async (req, res) => {
    const { cartId, productId } = req.params

    try{
        const response = await fs.promises.readFile(CARTS_PATH, "utf-8")
        
        if(!response.length) return res.status(404).send( { status: 404, success: false, error: true, response: "There are no carts." })

        const carts = JSON.parse(response)
        const cart = carts.find(x => x.id === cartId)

        if(!cart) return res.status(404).send( { status: 404, success: false, error: true, response: "Cart not found." })

        const { products } = cart

        if(!products.length) {
            const updatedCart = {...cart, products: [{ id: productId, quantity: 1 }]}
            const updatedCarts = carts.map(x => x.id === updatedCart.id ? updatedCart : x)
    
            await fs.promises.writeFile(CARTS_PATH, JSON.stringify(updatedCarts, null, "\t"))
            
            return res.status(201).send({ status: 201, success: true, error: false, response: `Product (${productId}) added to cart (${cartId}).`})
        }
        
        const productRepeated = products.find(x => x.id === productId)
        let updatedProducts

        if(productRepeated) updatedProducts = products.map(x => x.id === productId ? { ...x, quantity: x.quantity + 1 } : x)
        if(!productRepeated)  updatedProducts = [...products, { id: productId, quantity: 1 }]

        const updatedCart = {...cart, products: updatedProducts}
        const updatedCarts = carts.map(x => x.id === updatedCart.id ? updatedCart : x)

        await fs.promises.writeFile(CARTS_PATH, JSON.stringify(updatedCarts, null, "\t"))

        res.status(201).send({ status: 201, success: true, error: false, response: `Product (${productId}) added to cart (${cartId}).`})
    }catch(error){
        console.log(error)
        res.status(500).send({ error: error })
    }
})

cartsRouter.delete("/:id", async (req, res) => {
    const { id } = req.params

    try{
        const response = await fs.promises.readFile(CARTS_PATH, "utf-8")

        if(!response.length) return res.status(400).send({ status: 400, success: false, error: true, response: "There are no carts." })

        const carts = JSON.parse(response)
        const cart = carts.find(x => x.id === id)

        if(!cart) return res.status(404).send({ status: 404, success: false, error: true, response: "Cart not found."})

        const all = carts.filter(x => x.id !== cart.id && cart)

        await fs.promises.writeFile(CARTS_PATH, JSON.stringify(all, null, "\t"))

        res.status(200).send({ status: 200, success: true, error: false, response: "Cart deleted."})
    }catch(error){
        res.status(500).send({ error: error })
    }
})