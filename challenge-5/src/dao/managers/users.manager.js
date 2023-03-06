const CustomError = require("../../utils/CustomError")
const userModel = require("../models/user.model")

class UsersManager{
    async create({ first_name, last_name, age, email, password }){ 
        if(!first_name || !last_name || !age || !email || !password) throw new CustomError({ status: 400, ok: false, response: "Missing fields." })

        const data = { first_name, last_name, age, email, password }

        const repeated = await userModel.findOne({ email })

        if(repeated) throw new CustomError({ status: 400, ok: false, response: "Email already in use." })

        await userModel.create(data)

        return { status: 201, ok: true, response: "User created." }
    }
}

module.exports = UsersManager