import { Server } from "socket.io"
import { app } from "./index.js"
import { PORT } from "./config.js"

const httpServer = app.listen(PORT, () => console.log(`Server running at port ${PORT}`))

export const io = new Server(httpServer)

io.on("connection", socket => {
    console.log(`Socket ${socket.id} connected.`)
})