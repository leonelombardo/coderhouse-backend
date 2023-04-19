const fs = require("fs");
const crypto = require("crypto");

const CustomError = require("../../classes/CustomError");

class CartsDAO{
    constructor(){
        this.path = process.cwd() + "/src/fs/carts.json";
    }

    async find(){
        const response = await fs.promises.readFile(this.path);
        const carts = JSON.parse(response);

        return carts;
    }

    async findById(id){
        const response = await fs.promises.readFile(this.path);
        const carts = JSON.parse(response);
        const cart = carts.find(cart => cart.id === id);

        if(!cart) throw new CustomError({ status: 404, ok: false, response: "Cart not found." });

        return cart;
    }

    async create(){
        const response = await fs.promises.readFile(this.path);
        const carts = JSON.parse(response);

        const cart = { id: crypto.randomUUID(), products: []};

        if(!carts.length) await fs.promises.writeFile(this.path, JSON.stringify([cart], null, "\t"));
        else await fs.promises.writeFile(this.path, JSON.stringify([...carts, cart], null, "\t"));
        
        return "Cart created.";
    }

    async addProductToCart(cartId, productId){
        const response = await fs.promises.readFile(this.path);
        const carts = JSON.parse(response);
        const cart = carts.find(cart => cart.id === cartId);

        if(!cart) throw new CustomError({ status: 404, ok: false, response: "Cart not found." });

        const repeated = cart.products.find(product => product.product === productId);

        if(repeated) cart.products.find(product => product.product === productId && product.quantity++);
        else cart.products.push({ product: productId, quantity: 1 });

        const update = carts.map(x => x.id === cartId ? cart : x);

        await fs.promises.writeFile(this.path, JSON.stringify(update, null, "\t"));
    
        return "Product added to cart.";
    }

    async updateProducts(id, body){
        if(!body.products.length) throw new CustomError({ status: 400, ok: false, response: "Invalid request." });
        
        const response = await fs.promises.readFile(this.path);
        const carts = JSON.parse(response);
        const cart = carts.find(cart => cart.id === id);

        if(!cart) throw new CustomError({ status: 404, ok: false, response: "Cart not found." });

        const updated = carts.find(cart => cart.id === id && (cart.products = body.products));
        const update = carts.map(cart => cart.id === id ? updated : cart);
    
        await fs.promises.writeFile(this.path, JSON.stringify(update, null, "\t"));

        return update;
    }

    async updateProductQuantity(cartId, productId, body){
        if(!body.quantity) throw new Error("Invalid request.");

        const response = await fs.promises.readFile(this.path);
        const carts = JSON.parse(response);
        const cart = carts.find(cart => cart.id === cartId);

        if(!cart) throw new CustomError({ status: 404, ok: false, response: "Cart not found." });

        const found = cart.products.find(product => product.product && productId);

        if(!found) throw new CustomError({ status: 404, ok: false, response: "Product not found in cart." });

        const updated = cart.products.map(product => product.product === productId ? {...product, quantity: body.quantity } : product);
        const update = carts.map(cart => cart.id === cartId ? {...cart, products: updated } : cart);

        await fs.promises.writeFile(this.path, JSON.stringify(update, null, "\t"));

        return "Product quantity updated.";
    }

    async deleteOne(id){
        const response = await fs.promises.readFile(this.path);
        const carts = JSON.parse(response);
        const cart = carts.find(cart => cart.id === id);

        if(!cart) throw new CustomError({ status: 404, ok: false, response: "Cart not found." });

        const update = carts.filter(x => x.id !== id && x);

        await fs.promises.writeFile(this.path, JSON.stringify(update, null, "\t"));
        
        return "Cart deleted.";
    }

    async deleteMany(){
        await fs.promises.writeFile(this.path, JSON.stringify([])); 

        return "All carts were removed.";
    }

    async deleteProductFromCart(cartId, productId){
        const response = await fs.promises.readFile(this.path);
        const carts = JSON.parse(response);
        const cart = carts.find(cart => cart.id === cartId);

        if(!cart) throw new CustomError({ status: 404, ok: false, response: "Cart not found." });

        const filtered = cart.products.filter(product => product.product !== productId && product);
        const updated = carts.find(cart => cart.id === cartId && (cart.products = filtered));
        const update = carts.map(cart => cart.id === cartId ? updated : cart);

        await fs.promises.writeFile(this.path, JSON.stringify(update, null, "\t"));

        return "Product removed from cart.";
    }

    async deleteProducts(id){
        const response = await fs.promises.readFile(this.path);
        const carts = JSON.parse(response);
        const cart = carts.find(cart => cart.id === id);

        if(!cart) throw new CustomError({ status: 404, ok: false, response: "Cart not found." });

        const updated = carts.find(cart => cart.id === id && (cart.products = []));
        const update = carts.map(cart => cart.id === id ? updated : cart);

        await fs.promises.writeFile(this.path, JSON.stringify(update, null, "\t"));
        
        return "All products were removed from cart.";
    }
}

module.exports = CartsDAO;