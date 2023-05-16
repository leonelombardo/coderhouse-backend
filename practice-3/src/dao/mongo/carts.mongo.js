const Carts = require("../models/carts.model");
const Products = require("../models/products.model");

const CustomError = require("../../classes/CustomError");
const TicketsDAO = require("./tickets.mongo");

const Tickets = new TicketsDAO();

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

    async addProductToCart(cartId, productId, user){
        const cart = await Carts.findById(cartId);
        const product = await Products.findById(productId);

        if(!cart) throw new CustomError({ status: 404, ok: false, response: "Cart not found." });

        if(user.email === product.owner) return "Can't add own products.";

        const repeated = cart.products.find(product => product.product.equals(productId));
        
        if(repeated) cart.products.find(product => product.product.equals(productId) && product.quantity++);
        else cart.products.push({ product: product.id, quantity: 1 });

        await Carts.updateOne({ _id: cartId }, cart);
    
        return "Product added to cart.";
    }

    async generateTicket(id, email){
        const cart = await Carts.findById(id);

        if(!cart) throw new CustomError({ status: 404, ok: false, response: "Cart not found." });

        let total = 0;
        const products = [];
        const not_purchased_products = [];

        for(let i=0; i < cart.products.length; i++){
            const found = await Products.findById(cart.products[i].product);
            
            if(!found) not_purchased_products.push(cart.products[i].product._id);

            if(found.stock < cart.products[i].quantity) not_purchased_products.push(cart.products[i].product._id);

            else {
                found.stock -= cart.products[i].quantity;
                total += found.price * cart.products[i].quantity
    
                await Products.updateOne({ _id: cart.products[i].product }, found);
    
                products.push(cart.products[i].product._id)
            }
        }

        const updated = cart.products.filter(product => !products.find(x => x === product.product._id) && product);


        await Carts.updateOne({ _id: id }, {...cart._doc, products: updated });

        const ticket = await Tickets.create(total, email);

        return { ticket, not_purchased_products };
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
    
    async deleteMany(){
        await Carts.deleteMany();

        return "All carts were removed.";
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