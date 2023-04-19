const Carts = require("../models/carts.model");
const Products = require("../models/products.model");

class CartsDAO{
    async find(){
        return await Carts.find();
    }

    async findById(id){
        return await Carts.findById(id);
    }

    async create(){
        return await Carts.create({ products: [] });
    }

    async addProductToCart(cartId, productId){
        const cart = await Carts.findById(cartId);
        const product = await Products.findById(productId);

        if(!cart) throw new Error("No cart matches this ID.");

        const repeated = cart.products.find(product => product.product.equals(productId));
        
        if(repeated) cart.products.find(product => product.product.equals(productId) && product.quantity++);
        else cart.products.push({ product: product.id, quantity: 1 });

        await Carts.updateOne({ _id: cartId }, cart);
    
        return "Product added to cart.";
    }

    async updateProducts(id, body){
        if(!body.products.length) throw new Error("Invalid request.");

        return await Carts.updateOne({ _id: id }, { products: body.products });
    }

    async updateProductQuantity(cartId, productId, body){
        if(!body.quantity) throw new Error("Invalid request.");

        const cart = await Carts.findById(cartId);

        if(!cart) throw new Error("No cart matches this ID.");

        const found = cart.products.find(product => product.product.equals(productId));

        if(!found) throw new Error("Product not found in cart.");

        const update = cart.products.map(product => product.product.equals(productId) && (product.quantity = body.quantity));

        await Carts.updateOne({ _id: cartId }, update);

        return "Product quantity updated.";
    }

    async deleteOne(id){
        const cart = await Carts.findById(id);

        if(!cart) throw new Error("No cart matches this ID.");

        await Carts.deleteOne({ _id: id });
        
        return "Cart deleted.";
    }

    async deleteProductFromCart(cartId, productId){
        const cart = await Carts.findById(cartId);

        if(!cart) throw new Error("No cart matches this ID.");

        const update = cart.products.filter(product => !product.product.equals(productId) && product);

        await Carts.updateOne({ _id: cartId }, {...cart._doc, products: update});
    
        return "Product removed from cart.";
    }

    async deleteProducts(id){
        const cart = await Carts.findById(id);
        
        if(!cart) throw new Error("No cart matches this ID.");

        await Carts.updateOne({ _id: id }, {...cart._doc, products: []})
    
        return "All products were removed from cart.";
    }
}

module.exports = CartsDAO;