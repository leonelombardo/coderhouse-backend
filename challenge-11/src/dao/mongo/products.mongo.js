const Products = require("../models/products.model");
const Users = require("../models/users.model");

const CustomError = require("../../classes/CustomError");

class ProductsDAO{
    async find(){
        return await Products.find();
    }

    async findById(id){
        const product = await Products.findById(id);

        if(!product) throw new CustomError({ status: 404, ok: false, response: "Product not found." });
        
        return product;
    }

    async create(body){
        const { title, description, category, thumbnails, stock, price, code, status, owner } = body;

        if(owner){
            const user = await Users.findOne({ email: owner });

            if(user.role !== "admin" && user.role !== "premium") throw new CustomError({ status: 401, ok: false, response: "Unauthorized." });
        }

        const product = { title, description, category, thumbnails, stock, price, code, status, owner };

        await Products.create(product);
    
        return "Product created.";
    }

    async updateSome(id, body){
        const { title, description, category, thumbnails, stock, price, code, status } = body;

        const product = await Products.findById(id);

        if(!product) throw new CustomError({ status: 404, ok: false, response: "Product not found." });

        const updated = {
            title: title ?? product.title,
            description: description ?? product.description,
            category: category ?? product.category,
            thumbnails: thumbnails ?? product.thumbnails,
            stock: stock ?? product.stock,
            price: price ?? product.price,
            code: code ?? product.code,
            status: status ?? product.status
        }

        const update = await Products.updateOne({ _id: id }, updated);
    
        return "Product updated.";
    }

    async updateAll(id, body){
        const { title, description, category, thumbnails, stock, price, code, status } = body;

        if(!title || !description || !category || !thumbnails.length || !stock || !price || !code) throw new CustomError({ status: 400, ok: false, response: "Invalid request." });
        if(typeof(status) !== "boolean") throw new CustomError({ status: 400, ok: false, response: "Invalid request." });

        const updated = { title, description, category, thumbnails, stock, price, code, status };

        const update = await Products.updateOne({ _id: id }, updated);

        return "Product updated.";
    }

    async deleteOne(id, user){
        const product = await Products.findById(id);

        if(user.role === "admin"){
            await Products.deleteOne({ _id: id });
            
            return "Product removed.";
        }

        if(user.role === "premium" && user.email === product.owner){
            await Products.deleteOne({ _id: id });
    
            return "Product removed.";
        }

        throw new CustomError({ status: 403, ok: false, response: "Forbidden." });
    }

    async deleteMany(){
        await Products.deleteMany();

        return "All products were removed.";
    }
}

module.exports = ProductsDAO;