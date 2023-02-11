import express from "express"
import mongoose from "mongoose"

import { router } from "./router/router.js"
import { MONGODB_CLUSTER, MONGODB_PASSWORD, MONGODB_USER } from "./db/config.db.js"

export const app = express()

app.use(express.json())

mongoose.set("strictQuery", false)

mongoose.connect(`mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}${MONGODB_CLUSTER}/ecommerce?retryWrites=true&w=majority`, error => error && console.error(error))

router(app)