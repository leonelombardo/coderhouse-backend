import { Router } from "express"
import { v4 } from "uuid"
import fs from "fs"
import { PRODUCTS_PATH } from "../env.js"


export const productsRouter = Router()

productsRouter.get("/", async (req, res) => {
    const { limit } = req.query

    if(limit <= 0) return res.status(400).send({ status: 400, success: false, error: true, response: "Can't resolve if limit is equal to zero." })

    try{
        const response = await fs.promises.readFile(PRODUCTS_PATH, "utf-8")
        
        if(!response.length) return res.status(404).send({ status: 404, success: false, error: true, response: "There are no products." })
        
        const products = JSON.parse(response)
        
        if(limit) return res.status(200).send( products.slice(0, limit) )

        res.status(200).send(products)
    }catch(error){
        res.status(500).send({ error: error })
    }    
})

productsRouter.get("/:id", async (req, res) => {
    const { id } = req.params

    try{
        const response = await fs.promises.readFile(PRODUCTS_PATH, "utf-8")
        
        if(!response.length) return res.status(404).send({ status: 404, success: false, error: true, response: "There are no products." })
        
        const products = JSON.parse(response)
        const product = products.find(x => x.id === id)
        
        if(!product) return res.status(404).send({ status: 404, success: false, error: true, response: "Product not found." })
        
        res.status(200).send(product)
    }catch(error){
        res.status(500).send({ error: error })
    }
})

productsRouter.post("/", async (req, res) => {
    const { title, description, category, stock, price, code, status=true, thumbnails } = req.body

    if(!title || !description || !code || !price || !stock || !category) return res.status(400).send({ status: 400, success: false, error: true, response: "Please complete all fields." })

    const product = { id: v4(), title, description, category, thumbnails: thumbnails && thumbnails, stock, price, code, status }

    try{
        const response = await fs.promises.readFile(PRODUCTS_PATH, "utf-8")
        
        if(!response.length) {
            await fs.promises.writeFile(PRODUCTS_PATH, JSON.stringify([product], null, "\t"))
            
            return res.status(201).send({ status: 201, success: true, error: false, response: "Product added." })
        }
        
        const products = JSON.parse(response)
        products.push(product)
        
        await fs.promises.writeFile(PRODUCTS_PATH, JSON.stringify(products, null, "\t"))
        
        res.status(201).send({ status: 201, success: true, error: false, response: "Product added." })
    }catch(error){
        res.status(500).send({ error: error })
    }
})

productsRouter.put("/:id", async (req, res) => {
    const { title, description, category, stock, price, code, status=true } = req.body
    const { id } = req.params

    if(!title || !description || !category || !stock || !price || !code || !status) return res.status(400).send({ status: 400, success: false, error: true, response: "Missing keys." })

    try{
        const response = await fs.promises.readFile(PRODUCTS_PATH, "utf-8")

        if(!response.length) return res.status(400).send({ status: 400, success: false, error: true, response: "There are no products." })
        
        const products = JSON.parse(response)
        const product = products.find(product => product.id === id)

        if(!product) return res.status(404).send({ status: 404, success: false, error: true, response: "Product not found." }) 
    
        const all = products.map(x => x.id === product.id ? {...product, title, description, category, stock, price, code, status} : x)
    
        await fs.promises.writeFile(PRODUCTS_PATH, JSON.stringify(all, null, "\t"))

        res.status(200).send({ status: 200, success: true, error: false, response: "Product updated." })
    }catch(error){
        res.status(500).send({ error: error })
    }
})

productsRouter.delete("/:id", async (req, res) => {
    const { id } = req.params

    try{
        const response = await fs.promises.readFile(PRODUCTS_PATH, "utf-8")
        
        if(!response.length) return res.status(400).send({ status: 400, success: false, error: true, response: "There are no products." })

        const products = JSON.parse(response)
        const product = products.find(x => x.id === id)
    
        if(!product) return res.status(404).send({ status: 404, success: false, error: true, response: "Product not found." }) 
    
        const all = products.filter(x => x.id !== product.id && x)
        
        await fs.promises.writeFile(PRODUCTS_PATH, JSON.stringify(all, null, "\t"))

        res.status(200).send({ status: 200, success: true, error: false, response: "Product deleted."})
    }catch(error){
        res.status(500).send({ error: error })
    }
})