import fs from "fs"
import { v4 } from "uuid"

export class MessageManager{
    constructor(path){
        this.path = `${process.cwd()}/src/json/${path}`
    }

    async getMessages(){
        if(!fs.existsSync(this.path)) return { status: 404, ok: false, response: `Resource ${this.path} doesn't exist.` }

        try{
            const response = await fs.promises.readFile(this.path)
            
            if(!response.length) return { status: 404, ok: false, response: "No messages." }
            
            const data = JSON.parse(response)
            
            return { status: 200, ok: true, response: data }
        }catch(error){
            return { status: 500, ok: false, response: "Internal server error." }
        }
    }

    async createMessage(user, message){
        if(!fs.existsSync(this.path)) return { status: 404, ok: false, response: `Resource ${this.path} doesn't exist.` }

        try{
            const response = await fs.promises.readFile(this.path)
            const newMessage = { id: v4(), user, message }

            if(!response.length){
                await fs.promises.writeFile(this.path, JSON.stringify([newMessage], null, "\t"))
                
                return { status: 201, ok: true, response: "Message sent." }
            }

            const data = JSON.parse(response)
            const messages = [...data, newMessage]

            await fs.promises.writeFile(this.path, JSON.stringify(messages, null, "\t"))

            return { status: 201, ok: true, response: "Message sent." }
        }catch(error){
            return { status: 500, ok: false, response: "Internal server error." }
        }
    }

    async deleteMessage(id){
        if(!fs.existsSync(this.path)) return { status: 404, ok: false, response: `Resource ${this.path} doesn't exist.` }

        try{
            const response = await fs.promises.readFile(this.path)

            if(!response.length) return { status: 404, ok: false, response: "No messages." }

            const data = JSON.parse(response)
            const messageFound = data.find(x => x.id === id && x)

            if(!messageFound) return { status: 404, ok: false, response: "Message not found." }

            const updatedMessages = [...data].filter(x => x.id !== id && x)

            await fs.promises.writeFile(this.path, JSON.stringify(updatedMessages, null, "\t"))

            return { status: 200, ok: true, response: "Message deleted." }
        }catch(error){
            return { status: 500, ok: false, response: "Internal server error." }
        }
    }
}