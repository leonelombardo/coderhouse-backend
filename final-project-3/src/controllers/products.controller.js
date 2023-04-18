const { Router } = require("express");
const ProductsDAO = require("../dao/mongo/products.mongo");

const productsController = Router();
const Products = new ProductsDAO();

productsController.get("/", async (req, res, next) => {
    try{
        const response = await Products.find();
        
        res.status(200).json({ status: 200, ok: true, response });
    }catch(error){
        next(error);
    }
})

productsController.get("/:id", async (req, res, next) => {
    try{
        const response = await Products.findById(req.params.id);

        res.status(200).json({ status: 200, ok: true, response });
    }catch(error){
        next(error);
    }
})

productsController.post("/", async (req, res, next) => {
    try{
        const response = await Products.create(req.body);

        res.status(201).json({ status: 201, ok: true, response });
    }catch(error){
        next(error);
    }
})

module.exports = productsController;