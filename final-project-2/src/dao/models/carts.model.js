import mongoose from "mongoose"

const cartsCollection = "carts"

const cartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products" 
                }
            }
        ]
    }
})

cartSchema.pre("find", function() { this.populate("products.id") })

export const cartModel = mongoose.model(cartsCollection, cartSchema)