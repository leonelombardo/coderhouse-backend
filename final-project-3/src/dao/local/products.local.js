const crypto = require("crypto");
const CustomError = require("../../classes/CustomError");

class ProductsDAO{
    constructor(){
        this.products = [];
    }

    async find(){
        return this.products;
    }

    async findById(id){
        const product = this.products.find(product => product.product === id);

        if(!product) throw new CustomError({ status: 404, ok: false, response: "Product not found." });

        return product; 
    }

    async create(body){
        const { title, description, category, thumbnails, stock, price, code, status } = body;
        const product = { id: crypto.randomUUID(), title, description, category, thumbnails, stock, price, code, status };

        this.products.push(product);

        return "Product created.";
    }

    async updateSome(id, body){
        const { title, description, category, thumbnails, stock, price, code, status } = body;
        const product = this.products.find(product => product.id === id);
        
        if(!product) throw new CustomError({ status: 404, ok: false, response: "Product not found." });

        const updated = {
            id: product.id,
            title: title ?? product.title,
            description: description ?? product.description,
            category: category ?? product.category,
            thumbnails: thumbnails ?? product.thumbnails,
            stock: stock ?? product.stock,
            price: price ?? product.price,
            code: code ?? product.code,
            status: status ?? product.status
        }

        this.products = this.products.map(product => product.id === id ? updated : product);
    
        return "Product updated.";
    }

    async updateAll(id, body){
        const product = this.products.find(product => product.id === id);

        if(!product) throw new CustomError({ status: 404, ok: false, response: "Product not found." });
        
        const { title, description, category, thumbnails, stock, price, code, status } = body;

        if(!title || !description || !category || !thumbnails.length || !stock || !price || !code) throw new CustomError({ status: 400, ok: false, response: "Invalid request." });
        if(typeof(status) !== "boolean") throw new CustomError({ status: 400, ok: false, response: "Invalid request." });

        const updated = { id: product.id, title, description, category, thumbnails, stock, price, code, status };
        
        this.products = this.products.map(product => product.id === id ? updated : product);

        return "Product updated.";
    }
    
    async deleteOne(id){
        const product = this.products.find(product => product.id === id);

        if(!product) throw new CustomError({ status: 404, ok: false, response: "Product not found." });

        this.products = this.products.filter(product => product.id !== id && product)

        return "Product removed.";
    }

    async deleteMany(){
        this.products = [];

        return "All products were removed.";
    }
}

module.exports = ProductsDAO;