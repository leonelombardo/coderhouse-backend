const fs = require("fs");
const crypto = require("crypto");

class TicketsDAO{
    constructor(){
        this.path = process.cwd() + "/src/fs/tickets.json";
    }

    async find(){
        const response = await fs.promises.readFile(this.path);
        const tickets = JSON.parse(response);

        return tickets;
    }

    async create(total, email){
        const ticket = {
            id: crypto.randomUUID(),
            code: crypto.randomUUID(),
            purchase_datetime: new Date().toLocaleString(),
            amount: total,
            purchaser: email
        }

        const response = await fs.promises.readFile(this.path);
        const tickets = JSON.parse(response);

        if(!tickets.length) await fs.promises.writeFile(this.path, JSON.stringify([ticket], null, "\t"));
        else await fs.promises.writeFile(this.path, JSON.stringify([...tickets, ticket], null, "\t"));

        return ticket;
    }

    async deleteMany(){
        await fs.promises.writeFile(this.path, JSON.stringify([]));

        return "All tickets were removed."
    }
}

module.exports = TicketsDAO;