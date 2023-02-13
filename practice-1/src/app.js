import { Server } from "socket.io"
import { app } from "./index.js"
import { PORT } from "./config.js"
import { MessageManager } from "./dao/managers/mongodb_managers/message.manager.js"

const httpServer = app.listen(PORT, () => console.log(`Server running at port ${PORT}`))

export const io = new Server(httpServer)

const messageManager = new MessageManager()

io.on("connection", async (socket) => {
    console.log(`Socket ${socket.id} connected.`)
    
    const messages = await messageManager.getMessages()

    socket.emit("load-messages", messages.response)

    socket.on("email", data => {
        socket.broadcast.emit("user-connected", data)
    })

    socket.on("message", async (data) => {
        const { email, message } = data

        const response = await messageManager.createMessage({ user: email, message })
        const messages = await messageManager.getMessages()

        io.emit("new-message", messages.response)
    })
})