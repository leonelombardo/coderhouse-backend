import { Router } from "express"

export const chatsController = Router()

chatsController.get("/", async (req, res) => {
    res.status(200).render("chat.handlebars", { style: "chat.css", title: "Chat" })
})