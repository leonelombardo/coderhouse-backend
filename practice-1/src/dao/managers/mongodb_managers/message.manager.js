import { messageModel } from "../../models/messages.model.js"
import { CustomError } from "../../../utils/CustomError.js"

export class MessageManager{
    async getMessages(){
        try{
            const response = await messageModel.find()
            
            if(!response.length) throw new CustomError({ status: 404, ok: false, response: "No messages." })
            
            const mapped = response.map(x => ({ id: x.id, user: x.user, message: x.message }))

            return { status: 200, ok: true, response: mapped }
        }catch(error){
            throw new CustomError(error)
        }
    }

    async createMessage({ user, message }){
        try{
            const response = await messageModel.create({ user, message })

            return { status: 201, ok: true, response: "Message sent." }
        }catch(error){
            throw new CustomError(error)
        }
    }

    async deleteMessage(id){
        try{
            const messageFound = await messageModel.findById(id)

            if(!messageFound) throw new CustomError({ status: 404, ok: false, response: "Message not found." })

            const response = await messageModel.deleteOne({ _id: id })

            return { status: 200, ok: true, response: "Message deleted." }
        }catch(error){
            throw new CustomError(error)
        }
    }

    async deleteAllMessages(){
        try{
            const response = await messageModel.deleteMany()

            return { status: 200, ok: true, response: "All messages deleted." }
        }catch(error){
            throw new CustomError(error)
        }
    }
}