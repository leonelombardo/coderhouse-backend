import { Router } from "express"
import { MessageManager } from "../dao/managers/mongodb_managers/message.manager.js"

export const messagesController = Router()

const messageManager = new MessageManager("messages.json")

messagesController.get("/", async (req, res) => {
    try{
        const response = await messageManager.getMessages()

        res.status(response.status).json(response)
    }catch(error){
        res.status(500).json({ status: 500, ok: false, response: "Internal server error." })
    }
})

messagesController.post("/", async (req, res) => {
    const { user, message } = req.body

    try{
        const response = await messageManager.createMessage(user, message)

        res.status(response.status).json(response)
    }catch(error){
        res.status(500).json({ status: 500, ok: false, response: "Internal server error." })
    }
})

messagesController.delete("/", async (req, res) => {
    try{
        const response = await messageManager.deleteAllMessages()
        
        res.status(response.status).json(response)
    }catch(error){
        res.status(500).json({ status: 500, ok: false, response: "Internal server error." })
    }
})

messagesController.delete("/:id", async (req, res) => {
    const { id } = req.params

    try{
        const response = await messageManager.deleteMessage(id)

        res.status(response.status).json(response)
    }catch(error){
        res.status(500).json({ status: 500, ok: false, response: "Internal server error." })
    }
})