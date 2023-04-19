const Products = require("../models/products.model");

class ProductsDAO{
    async find(){
        return await Products.find();
    }

    async findById(id){
        return await Products.findById(id);
    }

    async create(body){
        const { title, description, category, thumbnails, stock, price, code, status } = body;
        const product = { title, description, category, thumbnails, stock, price, code, status };

        return await Products.create(product);
    }

    async updateSome(id, body){
        const { title, description, category, thumbnails, stock, price, code, status } = body;

        const product = await Products.findById(id);

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

        if(!title || !description || !category || !thumbnails.length || !stock || !price || !code) throw new Error("Invalid request.");
        if(typeof(status) !== "boolean") throw new Error("Invalid request.");

        const updated = { title, description, category, thumbnails, stock, price, code, status };

        const update = await Products.updateOne({ _id: id }, updated);

        return "Product updated.";
    }

    async deleteOne(id){
        await Products.deleteOne({ _id: id });

        return "Product removed.";
    }

    async deleteMany(){
        await Products.deleteMany();

        return "All products were removed.";
    }
}

module.exports = ProductsDAO;