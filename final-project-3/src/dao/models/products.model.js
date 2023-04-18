const mongoose = require("mongoose");

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

const Products = mongoose.model("products", productSchema);

module.exports = Products;