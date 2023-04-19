const { Router } = require("express");
const { CartsDAO } = require("../factory/index.js");

const cartsController = Router();
const Cart = new CartsDAO();

cartsController.get("/", async (req, res, next) => {
    try{
        const response = await Cart.find();
        
        res.status(200).json({ status: 200, ok: true, response });
    }catch(error){
        next(error);
    }
})

cartsController.get("/:id", async (req, res, next) => {
    try{
        const response = await Cart.findById(req.params.id);
        
        res.status(200).json({ status: 200, ok: true, response });
    }catch(error){
        next(error);
    }
})

cartsController.post("/", async (req, res, next) => {
    try{
        const response = await Cart.create();

        res.status(201).json({ status: 201, ok: true, response });
    }catch(error){
        next(error);
    }
})

cartsController.post("/:cartId/product/:productId", async (req, res, next) => {
    const { cartId, productId } = req.params;

    try{
        const response = await Cart.addProductToCart(cartId, productId);
    
        res.status(201).json({ status: 201, ok: true, response });
    }catch(error){
        next(error);
    }
})

cartsController.patch("/:id", async (req, res, next) => {
    try{
        const response = await Cart.updateProducts(req.params.id, req.body);
        
        res.status(200).json({ status: 200, ok: true, response });
    }catch(error){
        next(error);
    }
})

cartsController.patch("/:cartId/product/:productId", async (req, res, next) => {
    const { cartId, productId } = req.params;

    try{
        const response = await Cart.updateProductQuantity(cartId, productId, req.body);
    
        res.status(200).json({ status: 200, ok: true, response });
    }catch(error){
        next(error);
    }
})

cartsController.delete("/:id", async (req, res, next) => {
    try{
        const response = await Cart.deleteOne(req.params.id);
        
        res.status(200).json({ status: 200, ok: true, response });
    }catch(error){
        next(error);
    }
})

cartsController.delete("/", async (req, res, next) => {
    try{
        const response = await Cart.deleteMany();
        
        res.status(200).json({ status: 200, ok: true, response });
    }catch(error){
        next(error);
    }
})

cartsController.delete("/:cartId/product/:productId", async (req, res, next) => {
    const { cartId, productId } = req.params;

    try{
        const response = await Cart.deleteProductFromCart(cartId, productId);
    
        res.status(200).json({ status: 200, ok: true, response });
    }catch(error){
        next(error);
    }
})

cartsController.delete("/:id/products", async (req, res, next) => {
    try{
        const response = await Cart.deleteProducts(req.params.id);
    
        res.status(200).json({ status: 200, ok: true, response });
    }catch(error){
        next(error);
    }
})

module.exports = cartsController;