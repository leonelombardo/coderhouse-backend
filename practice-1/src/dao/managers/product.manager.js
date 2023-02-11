import fs from "fs"
import { v4 } from "uuid"

export class ProductManager{
    constructor(path){
        this.path = `${process.cwd()}/src/json/${path}`
    }
    
    async getData(){
        if(!fs.existsSync(this.path)) return { status: 404, ok: false, response: `Resource ${this.path} doesn't exist.` }

        try{
            const response = await fs.promises.readFile(this.path)

            if(!response.length) return { status: 200, ok: true, response: "No products found." }

            const data = JSON.parse(response)
            
            return { status: 200, ok: true, response: data }
        }catch(error){
            return { status: 500, ok: false, response: "Internal server error." }
        }
    }

    async postData({ title, description, category, thumbnails, stock, price, code, status }){
        const product = { id: v4(), title, description, category, thumbnails, stock: +stock, price: +price, code, status }

        if(!fs.existsSync(this.path)) return { status: 404, ok: false, response: `Resource "${this.path}" doesn't exist.` }

        try{
            const response = await fs.promises.readFile(this.path)
            
            if(!response.length){
                await fs.promises.writeFile(this.path, JSON.stringify([product], null, "\t"))
                
                return { status: 201, ok: true, response: "Product created." }
            }

            const data = JSON.parse(response)

            await fs.promises.writeFile(this.path, JSON.stringify([...data, product], null, "\t"))

            return { status: 201, ok: true, response: "Product created." }
        }catch(error){
            return { status: 500, ok: false, response: "Internal server error." }
        }
    }

    async updateData(id, { title, description, category, thumbnails, stock, price, code, status }){
        if(!fs.existsSync(this.path)) return { status: 404, ok: false, response: `Resource ${this.path} doesn't exist.` }

        try{
            const response = await fs.promises.readFile(this.path)
            const data = JSON.parse(response)
            const productFound = [...data].find(product => product.id === id)

            if(!productFound) return { status: 404, ok: false, response: "Product not found." }

            const product = {
                ...productFound,
                title: title || productFound.title,
                description: description || productFound.description,
                category: category || productFound.category,
                thumbnails: thumbnails ? thumbnails?.length ? thumbnails : [] : productFound.thumbnails,
                stock: stock !== undefined || stock !== null || stock !== false ? +stock : productFound.stock,
                price: price !== undefined || price !== null || price !== false ? +price : productFound.price,
                code: code || productFound.code,
                status: status !== undefined && status !== null && typeof(status) === "boolean" && status !== false ? true : false
            }

            const updated = [...data].map(x => x.id === id ? product : x)

            await fs.promises.writeFile(this.path, JSON.stringify(updated, null, "\t"))

            return { status: 200, ok: true, response: "Product updated." }
        }catch(error){
            console.log(error)
            return { status: 500, ok: false, response: "Internal server error." }
        }
    }

    async updateAllData(id, { title, description, category, thumbnails, stock, price, code, status }){
        if(!fs.existsSync(this.path)) return { status: 404, ok: false, response: `Resource "${this.path}" doesn't exist.` }

        if(!title || !description || !category || !thumbnails || !code) return { status: 400, ok: false, response: "Missing fields." }
        if(stock === undefined || stock === null || stock === false) return { status: 400, ok: false, response: "Missing fields." }
        if(price === undefined || price === null || price === false) return { status: 400, ok: false, response: "Missing fields." }
        if(status === undefined || status === null) return { status: 400, ok: false, response: "Missing fields." }

        try{
            const response = await fs.promises.readFile(this.path)
            const data = JSON.parse(response)
            const productFound = [...data].find(product => product.id === id && product)

            if(!productFound) return { status: 404, ok: false, response: "Product not found." }

            const product = { ...productFound, title, description, category, thumbnails: thumbnails?.length ? thumbnails : [thumbnails], stock: +stock, price: +price, code, status }
            const updated = [...data].map(x => x.id === id ? product : x)

            await fs.promises.writeFile(this.path, JSON.stringify(updated, null, "\t"))

            return { status: 201, ok: true, response: "Product updated." }
        }catch(error){
            return { status: 500, ok: false, response: "Internal server error." }
        }
    }

    async deleteData(id){
        if(!fs.existsSync(this.path)) return { status: 404, ok: false, response: `Resource "${this.path}" doesn't exist.` }

        try{
            const response = await fs.promises.readFile(this.path)
            const data = JSON.parse(response)
            const productFound = [...data].find(product => product.id === id)

            if(!productFound) return { status: 404, ok: false, response: "Product not found." }

            const updated = [...data].filter(product => product.id !== id && product)

            await fs.promises.writeFile(this.path, JSON.stringify(updated))
            
            return { status: 200, ok: true, response: "Product deleted." }
        }catch(error){
            return { status: 500, ok: false, response: "Internal server error." }
        }
    }
    
    async deleteAllData(){
        if(!fs.existsSync(this.path)) return { status: 404, ok: false, response: `Resource "${this.path}" doesn't exist.` }

        try{
            await fs.promises.writeFile(this.path, JSON.stringify([]))
            
            return { status: 200, ok: true, response: "All products deleted." }
        }catch(error){
            return { status: 500, ok: false, response: "Internal server error." }
        }
    }
}