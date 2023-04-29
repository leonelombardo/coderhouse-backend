const { Router } = require("express");

const mockProduct = require("../utils/mockProduct.utils");

const mockingsController = Router();

mockingsController.get("/products", (req, res, next) => {
    try{
        const products = [];

        for(let i=0; i < 100; i++){
            products.push(mockProduct());
        }

        res.status(200).json({ status: 200, ok: true, response: products });
    }catch(error){
        next(error);
    }
})

module.exports = mockingsController;