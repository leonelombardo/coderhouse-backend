import express from "express"
import mongoose from "mongoose"
import handlebars from "express-handlebars"

import { router } from "./router/router.js"
import { errorHandler } from "./middlewares/errorHandler.js"

import { MONGODB_CLUSTER, MONGODB_PASSWORD, MONGODB_USER } from "./db/config.db.js"
import { __dirname } from "./config.js"

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