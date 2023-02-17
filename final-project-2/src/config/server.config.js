import { config } from "dotenv"
import path from 'path'
import { fileURLToPath } from 'url'

config()

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const PORT = process.env.PORT || 3000