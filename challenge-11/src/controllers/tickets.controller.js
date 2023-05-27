const { Router } = require("express");
const { TicketsDAO } = require("../factory/index");

const ticketsController = Router();
const Tickets = new TicketsDAO();

ticketsController.get("/", async (req, res, next) => {
    try{
        const response = await Tickets.find();

        res.status(200).json({ status: 200, ok: true, response });
    }catch(error){
        next(error);
    }
})

ticketsController.delete("/", async (req, res, next) => {
    try{
        const response = await Tickets.deleteMany();

        res.status(200).json({ status: 200, ok: true, response });
    }catch(error){
        next(error);
    }
})

module.exports = ticketsController;