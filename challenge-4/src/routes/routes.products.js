import fs from "fs"
import { Router } from "express"
import { v4 } from "uuid"

import { io } from "../index.js"
import { createResponse } from "../utils/createResponse.js"
import { PRODUCTS_PATH, __dirname } from "../config.js"

export const productsRouter = Router()


productsRouter.get("/", async (req, res) => {
    try{
        const response = await fs.promises.readFile(__dirname + PRODUCTS_PATH, "utf-8")

        if(!response || !response.length) return res.render("404.handlebars", { message: "No products found." })

        const products = JSON.parse(response)

        res.render("home.handlebars", { products, thereAreProducts: products.length, title: "Home", style: "index.css" })
    }catch(error){
        createResponse(res, 500, error)
    }
})

productsRouter.delete("/product/:id", async (req, res) => {
    const { id } = req.params

    try{
        const response = await fs.promises.readFile(__dirname + PRODUCTS_PATH, "utf-8")

        if(!response || !response.length) return createResponse(res, 404, "No products found.")

        const products = JSON.parse(response)
        const product = products.find(x => x.id === id)

        if(!product) return createResponse(res, 404, "Product not found.")

        const updatedProducts = products.filter(x => x.id !== product.id)

        await fs.promises.writeFile(__dirname + PRODUCTS_PATH, JSON.stringify(updatedProducts, null, "\t"))

        io.emit("product-deleted", updatedProducts)
        
        createResponse(res, 200, "Product deleted.")
    }catch(error){
        createResponse(res, 500, error)
    }

})

productsRouter.get("/realtimeproducts", async (req, res) => {
    const response = await fs.promises.readFile(__dirname + PRODUCTS_PATH, "utf-8")
    let products

    if(!response) 
    if(!response.length) products = []
    if(response.length) products = JSON.parse(response)

    io.on("connection", socket => console.log(`Client ${socket.id} connected.`))

    res.render("realTimeProducts.handlebars", { products, thereAreProducts: products.length, title: "Real time products", style: "index.css" })
})

productsRouter.post("/realtimeproducts", async (req, res) => {
    const { title, description, price, code, status=true, stock, thumbnails } = req.body
    const product = { id: v4(), title, description, price, code, status, stock, thumbnails }

    try{
        const response = await fs.promises.readFile(__dirname + PRODUCTS_PATH, "utf-8")
       
        if(!response.length) {
            await fs.promises.writeFile(__dirname + PRODUCTS_PATH, JSON.stringify([product], null, "\t"))
            io.emit("new-product", product)
            return
        }    

        const products = JSON.parse(response)
        const isRepeated = products.find(x => x.code === product.code)

        if(isRepeated) return createResponse(res, 400, "This product code already exists.")
        
        products.push(product)

        await fs.promises.writeFile(__dirname + PRODUCTS_PATH, JSON.stringify(products, null, "\t"))

        io.emit("new-product", products)

        createResponse(res, 201, "Product added.")
    }catch(error){
        createResponse(res, 500, error)        
    }
})