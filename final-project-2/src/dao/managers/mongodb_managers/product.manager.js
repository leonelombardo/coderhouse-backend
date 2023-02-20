import { productModel } from "../../models/products.model.js"
import { CustomError } from "../../../utils/CustomError.js"
import { PORT } from "../../../config/server.config.js"

export class ProductManager{
    async getProducts(limit=10, page=1, sort, query){
        let filter

        if(query && query.includes("%")){
            const [key, value] = query.split("%20").join(" ").split("%")
            filter = { [key]: value }
        }else{
            filter = null
        }

        try{
            const response = await productModel.paginate(filter, { limit, page, sort: { price: sort } })

            if(!response.docs || !response.docs.length) throw new CustomError({ status: 404, ok: false, response: "No products." })
            
            const mapped = response.docs.map(x => (
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

            const { totalPages, prevPage, nextPage, hasPrevPage, hasNextPage } = response
            const prevLink = hasPrevPage ? `localhost:${PORT}/api/products${limit ? `?limit=${limit}` : ""}${page ? `?page=${response.page - 1}` : ""}${sort ? `?sort=${sort}` : ""}` : null
            const nextLink = hasNextPage ? `localhost:${PORT}/api/products${limit ? `?limit=${limit}` : ""}${page ? `?page=${response.page + 1}` : ""}${sort ? `?sort=${sort}` : ""}` : null
            
            return { status: 200, ok: true, response: mapped, totalPages, prevPage, nextPage, page: response.page, hasPrevPage, hasNextPage, prevLink, nextLink }
        }catch(error){
            throw new CustomError(error)
        }
    }

    async getProductById(id){
        try{
            const response = await productModel.findById(id)

            if(!response) throw new CustomError({ status: 404, ok: false, response: "Product not found." })

            return { status: 200, ok: true, response: response }
        }catch(error){
            throw new CustomError(error)
        }
    }

    async createProduct({ title, description, category, thumbnails, stock, price, code, status }){
        const product = { title, description, category, thumbnails, stock: +stock, price: +price, code, status }

        if(!title || !description || !category || !thumbnails || !code) throw new CustomError({ status: 400, ok: false, response: "Missing fields." })
        if(stock === undefined || stock === null || stock === false) throw new CustomError({ status: 400, ok: false, response: "Missing fields." })
        if(price === undefined || price === null || price === false) throw new CustomError({ status: 400, ok: false, response: "Missing fields." })
        if(status === undefined || status === null) throw new CustomError({ status: 400, ok: false, response: "Missing fields." })

        try{
            const codeRepeated = await productModel.find({ code: code })

            if(codeRepeated.length) throw new CustomError({ status: 400, ok: false, response: "Product code already exists." })

            const response = await productModel.create(product)

            return { status: 201, ok: true, response: "Product created." }
        }catch(error){
            throw new CustomError(error)
        }
    }

    async updateProduct(id, { title, description, category, thumbnails, stock, price, code, status }){
        try{
            const productFound = await productModel.findById(id)
            
            if(!productFound) throw new CustomError({ status: 404, ok: false, response: "Product not found." })
            
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
            throw new CustomError(error)
        }
    }

    async updateAllProductData(id, { title, description, category, thumbnails, stock, price, code, status }){
        try{
            const productFound = await productModel.findById(id)
            
            if(!productFound) throw new CustomError({ status: 404, ok: false, response: "Product not found." })
            
            const productData = productFound._doc

            if(!title || !description || !category || !thumbnails || !code) throw new CustomError({ status: 400, ok: false, response: "Missing fields." })
            if(stock === undefined || stock === null || stock === false) throw new CustomError({ status: 400, ok: false, response: "Missing fields." })
            if(price === undefined || price === null || price === false) throw new CustomError({ status: 400, ok: false, response: "Missing fields." })
            if(status === undefined || status === null) throw new CustomError({ status: 400, ok: false, response: "Missing fields." })

            const updatedProduct = { ...productData, title, description, category, thumbnails: thumbnails?.length ? thumbnails : [thumbnails], stock: +stock, price: +price, code, status }

            const response = await productModel.updateOne({ _id: id }, updatedProduct)

            return { status: 200, ok: true, response: "Product updated." }
        }catch(error){
            console.log(error)
            throw new CustomError(error)
        }
    }

    async deleteProduct(id){
        try{
            const productFound = await productModel.findById(id)

            if(!productFound) throw new CustomError({ status: 404, ok: false, response: "Product not found." })

            const response = await productModel.deleteOne({ _id: id })

            return { status: 200, ok: true, response: "Product deleted." }
        }catch(error){
            console.log(error)
            throw new CustomError(error)
        }
    }

    async deleteAllProducts(){
        try{
            const response = await productModel.deleteMany()

            return { status: 200, ok: true, response: "All products deleted." }
        }catch(error){
            throw new CustomError(error)
        }
    }
}