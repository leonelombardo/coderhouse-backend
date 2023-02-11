import fs from "fs"
import { v4 } from "uuid"

export class CartManager{
    constructor(path){
        this.path = `${process.cwd()}/src/json/${path}`,
        this.products_path = `${process.cwd()}/src/json/products.json`
    }

    async getData(){
        if(!fs.existsSync(this.path)) return { status: 404, ok: false, response: `Resource ${this.path} doesn't exist.` }
        
        try{
            const response = await fs.promises.readFile(this.path)
            const carts = JSON.parse(response)

            if(!carts.length) return { status: 404, ok: false, response: "No carts found. "}


            return { status: 200, ok: true, response: carts }
        }catch(error){
            return { status: 500, ok: false, response: "Internal server error." }
        }
    }

    async getDataById(id){
        try{
            const response = await fs.promises.readFile(this.path)
            
            if(!response.length) return { status: 404, ok: false, response: "No carts found." }

            const data = JSON.parse(response)
            const cart = data.find(x => x.id === id && x)
        
            if(!cart) return { status: 404, ok: false, response: "Cart not found." }

            return { status: 200, ok: true, response: cart }
        }catch(error){
            return { status: 500, ok: false, response: "Internal server error." }
        }
    }

    async createCart(){
        try{
            const cart = { id: v4(), products: [] }
            
            const response = await fs.promises.readFile(this.path)
    
            if(!response.length) {
                await fs.promises.writeFile(this.path, JSON.stringify([cart], null, "\t"))
                return { status: 201, ok: true, response: "Cart created." }
            } 
    
            const data = JSON.parse(response)
        
            await fs.promises.writeFile(this.path, JSON.stringify([...data, cart], null, "\t"))
        
            return { status: 201, ok: true, response: "Cart created." }
        }catch(error){
            return { status: 500, ok: false, response: "Internal server error." }
        } 
    }

    async addProduct(cartId, productId){
        try{
            const responseCarts = await fs.promises.readFile(this.path)

            if(!responseCarts.length) return { status: 404, ok: false, response: "Cart not found." }

            const carts = JSON.parse(responseCarts)
            const cartFound = carts.find(x => x.id === cartId && x)

            if(!cartFound) return { status: 404, ok: false, response: "Cart not found." }

            const responseProducts = await fs.promises.readFile(this.products_path)
            
            if(!responseProducts.length) return { status: 404, ok: false, response: "Product not found." }

            const products = JSON.parse(responseProducts)
            const productFound = products.find(x => x.id === productId && x)

            if(!productFound) return { status: 404, ok: false, response: "Product not found." }
            
            const cartProducts = cartFound.products

            const productRepeated = cartProducts.find(x => x.id === productId)
            let updatedProducts

            if(!productRepeated) updatedProducts = [...cartProducts, { id: productId, quantity: 1}]
            if(productRepeated) updatedProducts = cartProducts.map(x => x.id === productId ? {...x, quantity: x.quantity + 1} : x)

            const updatedCart = {...cartFound, products: updatedProducts}
            const updatedCarts = [...carts].map(x => x.id === cartFound.id ? updatedCart : x)

            await fs.promises.writeFile(this.path, JSON.stringify(updatedCarts, null, "\t"))

            return { status: 201, ok: true, response: "Product added to cart." }
        }catch(error){
            console.log(error)
            return { status: 500, ok: false, response: "Internal server error." }
        }
    }

    async delete(id){
        try{
            const response = await fs.promises.readFile(this.path)
            const data = JSON.parse(response)

            const cartFound = data.find(x => x.id === id)

            if(!cartFound) return { status: 404, ok: false, response: "Cart not found." }

            const updatedCarts = data.filter(x => x.id !== id && x)

            await fs.promises.writeFile(this.path, JSON.stringify(updatedCarts, null, "\t"))

            return { status: 200, ok: true, response: "Cart deleted." }
        }catch(error){
            return { status: 500, ok: false, response: "Internal server error." }
        }
    }
}