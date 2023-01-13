import { config } from "dotenv"

config()

export const PORT = process.env.PORT
export const CARTS_PATH = process.env.CARTS_PATH
export const PRODUCTS_PATH = process.env.PRODUCTS_PATH