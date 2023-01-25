import express from "express"
import handlebars from "express-handlebars"
import { Server } from "socket.io"
import { PORT, __dirname } from "./config.js"
import { useRoutes } from "./routes/routes.js"

const app = express()

app.use(express.json())

app.engine("handlebars", handlebars.engine())

app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")

app.use(express.static(__dirname + "/public"))

useRoutes(app)

const httpServer = app.listen(PORT, () => console.log(`Server running at port ${PORT}`))

export const io = new Server(httpServer)