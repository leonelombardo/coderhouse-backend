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
}

module.exports = ProductsDAO;