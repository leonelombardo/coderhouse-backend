import { config } from "dotenv"

config()

export const MONGODB_USER = process.env.MONGODB_USER
export const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD
export const MONGODB_CLUSTER = process.env.MONGODB_CLUSTER