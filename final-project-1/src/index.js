import express from "express"
import { useRouter } from "./routes/index.js"
import { PORT } from "./env.js"

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

useRouter(app)

app.listen(PORT, (req, res) => {
    console.log(`Running at port ${PORT}`)
})