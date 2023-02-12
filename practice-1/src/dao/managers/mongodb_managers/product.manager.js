import { productModel } from "../../models/products.model.js"

export class ProductManager{
    async getProducts(){
        try{
            const response = await productModel.find()
            const mapped = response.map(x => (
                {
                    id: x.id,
                    title: x.title,
                    description: x.description,
                    category: x.category,
                    thumbnails: x.thumbnails,
                    stock: x.stock,
                    price: x.price,
                    code: x.code,
                    status: x.status
                }
            ))

            if(!response.length) return { status: 404, ok: false, response: "No products." }

            return { status: 200, ok: true, response: mapped }
        }catch(error){
            return { status: 500, ok: false, response: "internal server error." }
        }
    }

    async getProductById(id){
        try{
            const response = await productModel.findById(id)

            if(!response) return { status: 404, ok: false, response: "Product not found." }

            return { status: 200, ok: true, response: response }
        }catch(error){
            return { status: 500, ok: false, response: "Internal server error." }
        }
    }

    async createProduct(data){
        try{
            const product = {...data, stock: +data.stock, price: +data.price } 
            
            const response = await productModel.create(product)

            return { status: 201, ok: true, response: "Product created." }
        }catch(error){
            return { status: 500, ok: false, response: "Internal server error." }
        }
    }

    async updateProduct(id, { title, description, category, thumbnails, stock, price, code, status }){
        try{
            const productFound = await productModel.findById(id)
            
            if(!productFound) return { status: 404, ok: false, response: "Product not found." }
            
            const productData = productFound._doc

            const updatedProduct = {
                ...productData,
                title: title || productData.title,
                description: description || productData.description,
                category: category || productData.category,
                thumbnails: thumbnails ? thumbnails?.length ? thumbnails : [] : productData.thumbnails,
                stock: stock !== undefined || stock !== null || stock !== false ? stock : productData.stock,
                price: price !== undefined || price !== null || price !== false ? price : productData.price,
                code: code || productData.code,
                status: status !== undefined && status !== null && typeof(status) === "boolean" && status !== false ? true : false
            }
            const response = await productModel.updateOne({ _id: id }, updatedProduct)

            return { status: 200, ok: true, response: "Product updated." }
        }catch(error){
            console.log(error)
            return { status: 500, ok: false, response: "Internal server error." }
        }
    }

    async updateAllProductData(id, { title, description, category, thumbnails, stock, price, code, status }){
        try{
            const productFound = await productModel.findById(id)
            
            if(!productFound) return { status: 404, ok: false, response: "Product not found." }
            
            const productData = productFound._doc

            if(!title || !description || !category || !thumbnails || !code) return { status: 400, ok: false, response: "Missing fields." }
            if(stock === undefined || stock === null || stock === false) return { status: 400, ok: false, response: "Missing fields." }
            if(price === undefined || price === null || price === false) return { status: 400, ok: false, response: "Missing fields." }
            if(status === undefined || status === null) return { status: 400, ok: false, response: "Missing fields." }

            const updatedProduct = { ...productData, title, description, category, thumbnails: thumbnails?.length ? thumbnails : [thumbnails], stock: +stock, price: +price, code, status }

            const response = await productModel.updateOne({ _id: id }, updatedProduct)

            return { status: 200, ok: true, response: "Product updated." }
        }catch(error){
            console.log(error)
            return { status: 500, ok: false, response: "Internal server error." }
        }
    }

    async deleteProduct(id){
        try{
            const productFound = await productModel.findById(id)

            if(!productFound) return { status: 404, ok: false, response: "Product not found." }

            const response = await productModel.deleteOne({ _id: id })

            return { status: 200, ok: true, response: "Product deleted." }
        }catch(error){
            console.log(error)
            return { status: 500, ok: false, response: "Internal server error." }
        }
    }

    async deleteAllProducts(){
        try{
            const response = await productModel.deleteMany()

            return { status: 200, ok: true, response: "All products deleted." }
        }catch(error){
            return { status: 500, ok: false, response: "Internal server error." }
        }
    }
}