import { messageModel } from "../../models/messages.model.js"

export class MessageManager{
    async getMessages(){
        try{
            const response = await messageModel.find()
            
            if(!response.length) return { status: 404, ok: false, response: "No messages." }
            
            const mapped = response.map(x => ({ id: x.id, user: x.user, message: x.message }))

            return { status: 200, ok: true, response: mapped }
        }catch(error){
            return { status: 500, ok: false, response: "Internal server error." }
        }
    }

    async createMessage({ user, message }){
        try{
            const response = await messageModel.create({ user, message })

            return { status: 201, ok: true, response: "Message sent." }
        }catch(error){
            return { status: 500, ok: false, response: "Internal server error." }
        }
    }

    async deleteMessage(id){
        try{
            const messageFound = await messageModel.findById(id)

            if(!messageFound) return { status: 404, ok: false, response: "Message not found." }

            const response = await messageModel.deleteOne({ _id: id })

            return { status: 200, ok: true, response: "Message deleted." }
        }catch(error){
            return { status: 500, ok: false, response: "Internal server error." }
        }
    }

    async deleteAllMessages(){
        try{
            const response = await messageModel.deleteMany()

            return { status: 200, ok: true, response: "All products deleted." }
        }catch(error){
            return { status: 500, ok: false, response: "Internal server error." }
        }
    }
}