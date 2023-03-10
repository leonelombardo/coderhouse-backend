const userModel = require("../models/user.model.js")
const CustomError = require("../../utils/CustomError.js")
const { hashPassword } = require("../../utils/bcrypt.utils.js")

class UserManager{
    async create(body){
        const { first_name, last_name, age, email, password } = body
        
        if(!first_name || !last_name || !age || !email || !password) throw new CustomError({ status: 400, ok: false, response: "Missing fields." })

        const user = { first_name, last_name, age, email, password: hashPassword(password) }
        
        const repeated = await userModel.findOne({ email })

        if(repeated) throw new CustomError({ status: 400, ok: false, response: "Email is already in use." })
        
        const response = await userModel.create(user)

        return { status: 201, ok: true, response: "User created." }
    }

    async updateOne(body){
        const { email, password } = body

        if(!email || !password) throw new CustomError({ status: 400, ok: false, response: "Missing fields." })

        const found = await userModel.findOne({ email })

        if(!found) throw new CustomError({ status: 404, ok: false, response: "We couldn't find any account with this email." })

        const response = await userModel.updateOne({ email }, { password: hashPassword(password) })

        return { status: 201, ok: true, response: "Password updated." }
    }
}

module.exports = UserManager