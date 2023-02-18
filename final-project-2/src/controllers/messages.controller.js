import { Router } from "express"
import { MessageManager } from "../dao/managers/mongodb_managers/message.manager.js"

export const messagesController = Router()

const messageManager = new MessageManager("messages.json")

messagesController.get("/", async (req, res, next) => {
    try{
        const response = await messageManager.getMessages()

        res.status(response.status).json(response)
    }catch(error){
        next(error)
    }
})

messagesController.post("/", async (req, res, next) => {
    const { user, message } = req.body

    try{
        const response = await messageManager.createMessage({ user, message })

        res.status(response.status).json(response)
    }catch(error){
        next(error)
    }
})

messagesController.delete("/", async (req, res, next) => {
    try{
        const response = await messageManager.deleteAllMessages()
        
        res.status(response.status).json(response)
    }catch(error){
        next(error)
    }
})

messagesController.delete("/:id", async (req, res, next) => {
    const { id } = req.params

    try{
        const response = await messageManager.deleteMessage(id)

        res.status(response.status).json(response)
    }catch(error){
        next(error)
    }
})