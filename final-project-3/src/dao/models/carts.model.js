const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products" 
                },
                quantity: Number
            }
        ]
    },
})

cartSchema.pre("findOne", function() { this.populate("products.product"); });

const Carts = mongoose.model("carts", cartSchema);

module.exports = Carts;