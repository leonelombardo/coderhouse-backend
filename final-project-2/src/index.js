import express from "express"
import mongoose from "mongoose"
import handlebars from "express-handlebars"
import path from 'path'
import { fileURLToPath } from 'url'

import { router } from "./router/router.js"
import { errorHandler } from "./middlewares/errorHandler.js"

import { MONGODB_CLUSTER, MONGODB_PASSWORD, MONGODB_USER } from "./config/db.config.js"

const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)

export const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))

app.engine("handlebars", handlebars.engine())


app.set("views", __dirname + "/views")

mongoose.set("strictQuery", false)

mongoose.connect(`mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}${MONGODB_CLUSTER}/ecommerce?retryWrites=true&w=majority`, error => error && console.error(error))

router(app)

app.use(errorHandler)