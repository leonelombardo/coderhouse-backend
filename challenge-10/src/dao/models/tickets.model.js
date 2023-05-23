const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true
    },
    purchase_datetime: Date,
    amount: Number,
    purcharser: {
        type: String,
        index: true
    }
})

const Tickets = mongoose.model("tickets", ticketSchema);

module.exports = Tickets;