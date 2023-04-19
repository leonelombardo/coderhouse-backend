const Carts = require("../models/carts.model");
const Products = require("../models/products.model");
const CustomError = require("../../classes/CustomError");

class CartsDAO{
    async find(){
        return await Carts.find();
    }

    async findById(id){
        const cart = await Carts.findById(id);

        if(!cart) throw new CustomError({ status: 404, ok: false, response: "Cart not found." });
        
        return cart;
    }

    async create(){
        await Carts.create({ products: [] });
    
        return "Cart created.";
    }

    async addProductToCart(cartId, productId){
        const cart = await Carts.findById(cartId);
        const product = await Products.findById(productId);

        if(!cart) throw new CustomError({ status: 404, ok: false, response: "Cart not found." });

        const repeated = cart.products.find(product => product.product.equals(productId));
        
        if(repeated) cart.products.find(product => product.product.equals(productId) && product.quantity++);
        else cart.products.push({ product: product.id, quantity: 1 });

        await Carts.updateOne({ _id: cartId }, cart);
    
        return "Product added to cart.";
    }

    async updateProducts(id, body){
        if(!body.products.length) throw new CustomError({ status: 400, ok: false, response: "Invalid request." });

        const cart = await Carts.findById(id);

        if(!cart) throw new CustomError({ status: 404, ok: false, response: "Cart not found." });

        return await Carts.updateOne({ _id: id }, { products: body.products });
    }

    async updateProductQuantity(cartId, productId, body){
        if(!body.quantity) throw new CustomError({ status: 400, ok: false, response: "Invalid request." });

        const cart = await Carts.findById(cartId);

        if(!cart) throw new CustomError({ status: 404, ok: false, response: "Cart not found." });

        const found = cart.products.find(product => product.product.equals(productId));

        if(!found) throw new CustomError({ status: 404, ok: false, response: "Product not found in cart." });

        const updated = cart.products.find(product => product.product.equals(productId) && (product.quantity = body.quantity));
        const update = cart.products.map(product => product.product.equals(updated.product) ? updated : product);

        await Carts.updateOne({ _id: cartId }, {...cart._doc, products: update});

        return "Product quantity updated.";
    }

    async deleteOne(id){
        const cart = await Carts.findById(id);

        if(!cart) throw new CustomError({ status: 404, ok: false, response: "Cart not found." });

        await Carts.deleteOne({ _id: id });
        
        return "Cart deleted.";
    }

    async deleteProductFromCart(cartId, productId){
        const cart = await Carts.findById(cartId);

        if(!cart) throw new CustomError({ status: 404, ok: false, response: "Cart not found." });

        const update = cart.products.filter(product => !product.product.equals(productId) && product);

        await Carts.updateOne({ _id: cartId }, {...cart._doc, products: update});
    
        return "Product removed from cart.";
    }

    async deleteProducts(id){
        const cart = await Carts.findById(id);
        
        if(!cart) throw new CustomError({ status: 404, ok: false, response: "Cart not found." });

        await Carts.updateOne({ _id: id }, {...cart._doc, products: []})
    
        return "All products were removed from cart.";
    }
}

module.exports = CartsDAO;