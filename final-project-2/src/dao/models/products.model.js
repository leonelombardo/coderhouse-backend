import mongoose from "mongoose"

const productsCollection = "products"

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    thumbnails: Array,
    stock: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        index: true
    },
    status: Boolean
})

export const productModel = mongoose.model(productsCollection, productSchema)