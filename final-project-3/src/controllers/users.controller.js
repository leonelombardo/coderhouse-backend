const { Router } = require("express");

const { UsersDAO } = require("../factory/index");

const usersController = Router();
const Users = new UsersDAO();

usersController.get("/", async (req, res, next) => {
    try{
        const response = await Users.find();

        res.status(200).json({ status: 200, ok: true, response })
    }catch(error){
        next(error);
    }
})

usersController.get("/:id", async (req, res, next) => {
    try{
        const response = await Users.findById(req.params.id);

        res.status(200).json({ status: 200, ok: true, response })
    }catch(error){
        next(error);
    }
})

usersController.post("/", async (req, res, next) => {
    try{
        const response = await Users.create(req.body);

        res.status(201).json({ status: 201, ok: true, response })
    }catch(error){
        next(error);
    }
})

usersController.delete("/:id", async (req, res, next) => {
    try{
        const response = await Users.deleteOne(req.params.id);

        res.status(200).json({ status: 200, ok: true, response })
    }catch(error){
        next(error);
    }
})

usersController.delete("/", async (req, res, next) => {
    try{
        const response = await Users.deleteMany();

        res.status(200).json({ status: 200, ok: true, response })
    }catch(error){
        next(error);
    }
})

module.exports = usersController;