const crypto = require("crypto");

class CartsDAO{
    constructor(){
        this.carts = [];
    }

    find(){
        return this.carts;
    }

    findById(id){
        const cart = this.carts.find(cart => cart.id === id);

        if(!cart) throw new Error("No cart matches this ID.");

        return cart;
    }

    create(){
        this.carts.push({ id: crypto.randomUUID(), products: []});
    
        return "Cart created.";
    }

    addProductToCart(cartId, productId){
        const cart = this.carts.find(cart => cart.id === cartId);

        if(!cart) throw new Error("No cart matches this ID.");

        const repeated = cart.products.find(product => product.product === productId);

        if(repeated) cart.products.find(product => product.product === productId && product.quantity++);
        else cart.products.push({ product: productId, quantity: 1 });
    
        return "Product added to cart.";
    }

    async updateProducts(id, body){
        if(!body.products.length) throw new Error("Invalid request.");

        const cart = this.carts.find(cart => cart.id === id);

        if(!cart) throw new Error("No cart matches this ID.");

        return this.carts.find(cart => cart.id === id && (cart.products = body.products));
    }

    async updateProductQuantity(cartId, productId, body){
        if(!body.quantity) throw new Error("Invalid request.");

        const cart = this.carts.find(cart => cart.id === cartId);

        if(!cart) throw new Error("No cart matches this ID.");

        const found = cart.products.find(product => product.product && productId);

        if(!found) throw new Error("Product not found in cart.");

        const update = cart.products.map(product => product.product === productId && (product.quantity = body.quantity));

        this.carts.find(cart => cart.id === cartId && update);

        return "Product quantity updated.";
    }

    async deleteOne(id){
        const cart = this.carts.find(cart => cart.id === id);

        if(!cart) throw new Error("No cart matches this ID.");

        this.carts = this.carts.filter(x => x.id !== id && x);
        
        return "Cart deleted.";
    }

    async deleteProductFromCart(cartId, productId){
        const cart = this.carts.find(cart => cart.id === cartId);

        if(!cart) throw new Error("No cart matches this ID.");

        const update = cart.products.filter(product => product.product !== productId && product);

        this.carts.find(cart => cart.id === cartId && (cart.products = update));
    
        return "Product removed from cart.";
    }

    async deleteProducts(id){
        const cart = this.carts.find(cart => cart.id === id);

        if(!cart) throw new Error("No cart matches this ID.");

        const update = cart.products = [];

        this.carts.find(cart => cart.id === id && (cart.products = update));
    
        return "All products were removed from cart.";
    }
}

module.exports = CartsDAO;