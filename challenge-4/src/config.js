import dotenv from "dotenv"
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

export const PORT = process.env.PORT
export const PRODUCTS_PATH = process.env.PRODUCTS_PATH

const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)