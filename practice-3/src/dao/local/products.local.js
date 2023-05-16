const fs = require("fs");
const crypto = require("crypto");

const CustomError = require("../../classes/CustomError");

class ProductsDAO{
    constructor(){
        this.path = process.cwd() + "/src/fs/products.json"
        this.users = process.cwd() + "/src/fs/users.json"
    }

    async find(){
        const response = await fs.promises.readFile(this.path);
        const products = JSON.parse(response);

        return products;
    }

    async findById(id){
        const response = await fs.promises.readFile(this.path);
        const products = JSON.parse(response);
        const product = products.find(product => product.id === id);

        if(!product) throw new CustomError({ status: 404, ok: false, response: "Product not found." });

        return product; 
    }

    async create(body){
        const response = await fs.promises.readFile(this.path);
        const products = JSON.parse(response);
        
        const { title, description, category, thumbnails, stock, price, code, status, owner } = body;

        if(owner){
            const usersResponse = await fs.promises.readFile(this.users);
            const users = JSON.parse(usersResponse);
            const user = users.find(x => x.email === owner);
    
            if(user.role !== "admin" && user.role !== "premium") throw new CustomError({ status: 400, ok: false, response: "Owner must have premium role." });
        }
        
        const product = { id: crypto.randomUUID(), title, description, category, thumbnails, stock, price, code, status, owner: owner || "admin" };

        if(!products.length) await fs.promises.writeFile(this.path, JSON.stringify([product], null, "\t"));
        else await fs.promises.writeFile(this.path, JSON.stringify([...products, product], null, "\t"));

        return "Product created.";
    }

    async updateSome(id, body){
        const response = await fs.promises.readFile(this.path);
        const products = JSON.parse(response);
        const product = products.find(product => product.id === id);
        
        const { title, description, category, thumbnails, stock, price, code, status } = body;
        
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

        const update = products.map(product => product.id === id ? updated : product);
        
        await fs.promises.writeFile(this.path, JSON.stringify(update, null, "\t"));

        return "Product updated.";
    }

    async updateAll(id, body){
        const response = await fs.promises.readFile(this.path);
        const products = JSON.parse(response);
        const product = products.find(product => product.id === id);

        if(!product) throw new CustomError({ status: 404, ok: false, response: "Product not found." });
        
        const { title, description, category, thumbnails, stock, price, code, status } = body;

        if(!title || !description || !category || !thumbnails.length || !stock || !price || !code) throw new CustomError({ status: 400, ok: false, response: "Invalid request." });
        if(typeof(status) !== "boolean") throw new CustomError({ status: 400, ok: false, response: "Invalid request." });

        const updated = { id: product.id, title, description, category, thumbnails, stock, price, code, status };
        
        const update = products.map(product => product.id === id ? updated : product);

        await fs.promises.writeFile(this.path, JSON.stringify(update, null, "\t"));

        return "Product updated.";
    }
    
    async deleteOne(id){
        const response = await fs.promises.readFile(this.path);
        const products = JSON.parse(response);
        const product = products.find(product => product.id === id);

        if(!product) throw new CustomError({ status: 404, ok: false, response: "Product not found." });

        const update = products.filter(product => product.id !== id && product)

        await fs.promises.writeFile(this.path, JSON.stringify(update, null, "\t"));

        return "Product removed.";
    }

    async deleteMany(){
        await fs.promises.writeFile(this.path, JSON.stringify([]));

        return "All products were removed.";
    }
}

module.exports = ProductsDAO;