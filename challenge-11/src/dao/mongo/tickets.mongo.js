const crypto = require("crypto");

const Tickets = require("../models/tickets.model");

class TicketsDAO{
    async find(){
        return await Tickets.find();
    }

    async create(total, email){
        const ticket = {
            code: crypto.randomUUID(),
            purchase_datetime: new Date().toLocaleString(),
            amount: total,
            purchaser: email
        }

        return await Tickets.create(ticket);
    }

    async deleteMany(){
        await Tickets.deleteMany();

        return "All tickets were removed."
    }
}

module.exports = TicketsDAO;