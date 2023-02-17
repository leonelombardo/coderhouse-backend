import { cartModel } from "../../models/carts.model.js"
import { productModel } from "../../models/products.model.js"
import { CustomError } from "../../../utils/CustomError.js"

export class CartManager{
    async getCarts(){
        try{
            const response = await cartModel.find()
            
            if(!response.length) throw new CustomError({ status: 404, ok: false, response: "No carts."})

            const mapped = response.map(x => ({ id: x._id, products: x.products }))

            return { status: 200, ok: true, response: mapped }
        }catch(error){
            throw new CustomError(error)
        }
    }

    async getCartById(id){
        try{
            const cartFound = await cartModel.find({ _id: id })
            
            if(!cartFound || !cartFound.length) throw new CustomError({ status: 404, ok: false, response: "Cart not found" })

            const mapped = cartFound.map(x => ({ id: x._id, products: x.products }))

            return { status: 200, ok: true, response: mapped }
        }catch(error){
            throw new CustomError(error)
        }
    }

    async createCart(){
        try{
            const response = await cartModel.create({ products: []})
        
            return { status: 201, ok: true, response: "Cart created." }
        }catch(error){
            throw new CustomError(error)
        } 
    }

    async addProductToCart(cartId, productId){
        try{
            const cartFound = await cartModel.find({ _id: cartId})

            if(!cartFound || !cartFound.length) throw new CustomError({ status: 404, ok: false, response: "Cart not found." })

            const productFound = await productModel.find({ _id: productId })
            
            if(!productFound || !productFound.length) throw new CustomError({ status: 404, ok: false, response: "The product that you are trying to add doesn't exist." })
            
            const cartProducts = cartFound[0].products

            const productRepeated = cartProducts.find(x => x.id === productId)
            let updatedProducts

            if(!productRepeated) updatedProducts = [...cartProducts, { id: productId, quantity: 1}]
            if(productRepeated) updatedProducts = cartProducts.map(x => x.id === productId ? {...x, quantity: x.quantity + 1} : x)

            const updatedCart = {...cartFound, products: updatedProducts}

            await cartModel.updateOne({ _id: cartId}, updatedCart)

            return { status: 201, ok: true, response: "Product added to cart." }
        }catch(error){
            console.log(error)
            throw new CustomError(error)
        }
    }

    async deleteCart(id){
        try{
            const cartFound = await cartModel.find({ _id: id })

            if(!cartFound || !cartFound.length) throw new CustomError({ status: 404, ok: false, response: "Cart not found." })

            await cartModel.deleteOne({ _id: id })

            return { status: 200, ok: true, response: "Cart deleted." }
        }catch(error){
            throw new CustomError(error)
        }
    }
}