import express from "express"
import { useRouter } from "./routes/index.js"
import { PORT } from "./env.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

useRouter(app)

app.listen(PORT, (req, res) => {
    console.log(`Running at port ${PORT}`)
})