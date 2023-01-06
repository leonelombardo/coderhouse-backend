import express from "express"
import { ProductManager } from "./class/ProductManager.js"

const productManager = new ProductManager("./utils/products.json")
const products = await productManager.getProducts()

const server = express()

server.listen(8080, () => {
    console.log("Express server running on localhost:8080.")
})

server.get("/", (req, res) => {
    res.send("Welcome to my own server created with Express.")
})

server.get("/products", (req, res) => {
    const { limit } = req.query

    if(limit) return res.send(products.slice(0, limit))

    return res.send(products)
})

server.get("/products/:productId", (req, res) => {
    const { productId } = req.params

    const product = products.find(product => product.id === +productId && product)

    res.send(product)
})