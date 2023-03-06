const CustomError = require("../../utils/CustomError")
const userModel = require("../models/user.model")

class AuthManager{
    async login({ email, password }){
        if(!email || !password) throw new CustomError({ status: 400, ok: false, response: "Missing fields." })
    
        const found = await userModel.findOne({ email })

        if(!found) throw new CustomError({ status: 400, ok: false, response: "Email and password doesn't match." })

        if(found.password !== password) throw new CustomError({ status: 400, ok: false, response: "Email and password doesn't match." }) 

        return { status: 200, ok: true, response: { first_name: found.first_name, last_name: found.last_name, email: found.email } }
    }
}

module.exports = AuthManager